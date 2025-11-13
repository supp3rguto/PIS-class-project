python -m pip install "fastapi[standard]"
python -m pip freeze
python -m pip freeze > requirements.txt (para cada biblioteca instalada)
python install -r requirements.txt
python -m fastapi dev main.py