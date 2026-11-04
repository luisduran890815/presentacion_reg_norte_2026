import sys
import uuid
from pathlib import Path

EXTENSIONES = {".jpg", ".jpeg"}


def renombrar(carpeta: Path) -> None:
    if not carpeta.is_dir():
        print(f"La ruta no existe o no es una carpeta: {carpeta}")
        return

    fotos = sorted(
        (f for f in carpeta.iterdir() if f.is_file() and f.suffix.lower() in EXTENSIONES),
        key=lambda f: f.name.lower(),
    )

    total = len(fotos)
    print(f"\nCarpeta: {carpeta}")
    print(f"Fotos JPG encontradas: {total}")
    if total == 0:
        return

    resp = input(f"¿Renombrar las {total} fotos como foto-1.jpg ... foto-{total}.jpg? (s/n): ")
    if resp.strip().lower() != "s":
        print("Cancelado. No se cambió nada.")
        return

    # Paso 1: nombres temporales (evita choques si ya existe foto-1.jpg)
    temporales = []
    for f in fotos:
        tmp = f.with_name(f"__tmp_{uuid.uuid4().hex}.jpg")
        f.rename(tmp)
        temporales.append((f.name, tmp))

    # Paso 2: nombres finales
    for i, (original, tmp) in enumerate(temporales, start=1):
        nuevo = tmp.with_name(f"foto-{i}.jpg")
        tmp.rename(nuevo)
        print(f"  {original}  ->  {nuevo.name}")

    print(f"\nListo: {total} fotos renombradas.")


if __name__ == "__main__":
    ruta = sys.argv[1] if len(sys.argv) > 1 else input("Pega la ruta de la carpeta: ")
    renombrar(Path(ruta.strip().strip('"')))