#!/bin/bash

# Kopia zawartości pliku "a" zaczynając od 5 linii
export_line_numbers=$(awk '/^export/ {print NR; exit}' ./src/db/introspects/schema.ts)
tail -n +"$export_line_numbers" ./src/db/introspects/schema.ts > file_temp
echo "" >> file_temp

# Wstawienie skopiowanej zawartości do pliku "b" pomiędzy znacznikami
awk '/\/\/DBSTART/ {print; system("cat file_temp"); f=1; next} /\/\/DBEND/ {f=0} !f' ./src/db/schema.ts > file_temp2

# Przeniesienie tymczasowego pliku do pliku "b"
mv file_temp2 ./src/db/schema.ts

# Usunięcie tymczasowych plików
rm file_temp

echo "✨ Schema updated ✨"
echo "🔎 check schema.ts file for missing imports 🔎"