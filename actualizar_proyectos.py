#!/usr/bin/env python3
"""Genera proyectos_index.json a partir de pj_destacados/.

Estructura esperada:
    pj_destacados/<ciudad>/<unidad_de_negocio>/<proyecto>/<imagen>

Opcionalmente, cada carpeta de proyecto puede incluir proyecto.json:
    {
      "nombre": "Nombre visible",
      "texto": "Descripción inicial",
      "fotos": [
        "foto-1.jpg",
        {"archivo": "foto-2.jpg", "texto": "Pie de foto"}
      ]
    }

Si no se declara "fotos", se incluyen automáticamente todas las imágenes
compatibles encontradas en la carpeta del proyecto.
"""

from __future__ import annotations

import json
import sys
import unicodedata
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parent
PROJECTS_DIR = BASE_DIR / "pj_destacados"
OUTPUT_FILE = BASE_DIR / "proyectos_index.json"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
IGNORED_NAMES = {".ds_store", "thumbs.db", "desktop.ini", "leeme.txt", ".gitkeep"}

CITY_LABELS = {
    "barranquilla": "Barranquilla",
    "cartagena": "Cartagena",
    "santa_marta": "Santa Marta",
    "valledupar": "Valledupar",
    "monteria": "Montería",
    "cucuta": "Cúcuta",
    "bucaramanga": "Bucaramanga",
}
CITY_ORDER = {key: position for position, key in enumerate(CITY_LABELS)}

BUSINESS_LABELS = {
    "seguros_generales": "Seguros Generales",
    "servicios_generales": "Servicios Generales",
    "ips": "IPS",
    "aydx": "AYDX",
    "eps": "EPS",
}
BUSINESS_ORDER = {key: position for position, key in enumerate(BUSINESS_LABELS)}


def normalized_key(value: str) -> str:
    """Normaliza solo para comparar y ordenar; no cambia la ruta física."""
    value = unicodedata.normalize("NFD", value)
    value = "".join(character for character in value if unicodedata.category(character) != "Mn")
    return "_".join(value.lower().strip().replace("-", " ").split())


def humanize(value: str) -> str:
    words = value.replace("_", " ").replace("-", " ").split()
    return " ".join(word.upper() if word.lower() in {"ips", "aydx", "eps", "arl", "sura"} else word.capitalize() for word in words)


def visible_city(folder_name: str) -> str:
    return CITY_LABELS.get(normalized_key(folder_name), humanize(folder_name))


def visible_business(folder_name: str) -> str:
    return BUSINESS_LABELS.get(normalized_key(folder_name), humanize(folder_name))


def read_metadata(project_dir: Path) -> dict[str, Any]:
    metadata_file = project_dir / "proyecto.json"
    if not metadata_file.is_file():
        return {}
    try:
        data = json.loads(metadata_file.read_text(encoding="utf-8-sig"))
        if not isinstance(data, dict):
            raise ValueError("la raíz debe ser un objeto JSON")
        return data
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as error:
        print(f"ADVERTENCIA: no se pudo leer {metadata_file.relative_to(BASE_DIR)}: {error}", file=sys.stderr)
        return {}


def automatic_photos(project_dir: Path) -> list[str]:
    return [
        item.name
        for item in sorted(project_dir.iterdir(), key=lambda path: path.name.casefold())
        if item.is_file()
        and item.name.casefold() not in IGNORED_NAMES
        and item.suffix.casefold() in IMAGE_EXTENSIONS
    ]


def normalized_photos(metadata: dict[str, Any], detected: list[str]) -> list[Any]:
    configured = metadata.get("fotos")
    if not isinstance(configured, list):
        return detected

    result: list[Any] = []
    for item in configured:
        if isinstance(item, str) and item.strip():
            result.append(item.strip())
        elif isinstance(item, dict) and isinstance(item.get("archivo"), str) and item["archivo"].strip():
            result.append({
                "archivo": item["archivo"].strip(),
                "texto": str(item.get("texto", "")).strip(),
            })
    return result or detected


def scan_projects() -> list[dict[str, Any]]:
    if not PROJECTS_DIR.is_dir():
        print("ADVERTENCIA: no existe pj_destacados/. Se conserva el índice actual.", file=sys.stderr)
        return []

    projects: list[dict[str, Any]] = []
    city_dirs = [path for path in PROJECTS_DIR.iterdir() if path.is_dir() and not path.name.startswith(".")]
    city_dirs.sort(key=lambda path: (CITY_ORDER.get(normalized_key(path.name), 999), path.name.casefold()))

    for city_dir in city_dirs:
        business_dirs = [path for path in city_dir.iterdir() if path.is_dir() and not path.name.startswith(".")]
        business_dirs.sort(key=lambda path: (BUSINESS_ORDER.get(normalized_key(path.name), 999), path.name.casefold()))

        for business_dir in business_dirs:
            project_dirs = [path for path in business_dir.iterdir() if path.is_dir() and not path.name.startswith(".")]
            project_dirs.sort(key=lambda path: path.name.casefold())

            for project_dir in project_dirs:
                metadata = read_metadata(project_dir)
                detected = automatic_photos(project_dir)
                relative_folder = project_dir.relative_to(PROJECTS_DIR).as_posix()
                projects.append({
                    "ciudad": str(metadata.get("ciudad") or visible_city(city_dir.name)).strip(),
                    "unidad": str(metadata.get("unidad") or visible_business(business_dir.name)).strip(),
                    "unidades": [str(metadata.get("unidad") or visible_business(business_dir.name)).strip()],
                    "proyecto": project_dir.name,
                    "carpeta": relative_folder,
                    "nombre": str(metadata.get("nombre") or humanize(project_dir.name)).strip(),
                    "texto": str(metadata.get("texto") or "Escriba aquí la descripción, los resultados y los aspectos destacados del proyecto.").strip(),
                    "fotos": normalized_photos(metadata, detected),
                })

    return projects


def write_index(projects: list[dict[str, Any]]) -> None:
    temporary = OUTPUT_FILE.with_suffix(".json.tmp")
    temporary.write_text(json.dumps(projects, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(OUTPUT_FILE)


def main() -> int:
    if not PROJECTS_DIR.is_dir():
        if not OUTPUT_FILE.exists():
            write_index([])
        print("ADVERTENCIA: no existe pj_destacados/. Se conserva el índice actual.", file=sys.stderr)
        return 0

    projects = scan_projects()
    write_index(projects)
    photo_count = sum(len(project.get("fotos", [])) for project in projects)
    print(f"Índice actualizado: {len(projects)} proyecto(s), {photo_count} fotografía(s).")
    print(f"Archivo: {OUTPUT_FILE.relative_to(BASE_DIR)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
