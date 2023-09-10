# extrasum
A web application for extractive summarization based on SummaRuNNer.

## Run on local
### Clone project
```bash
git clone https://github.com/Baragouine/extrasum.git
```

### Create env (conda)
```bash
conda create --name EXTRASUM python=3.9
```

### Activate env
```bash
conda activate EXTRASUM
```

### Enter into back-end directory
```bash
cd extrasum/back/
```

### Install dependencies
```bash
pip install -r requirements.txt
conda install pytorch-geometric -c rusty1s -c conda-forge
```

### Install Django REST framework and Django cors header
```bash
pip install django
pip install djangorestframework
pip install django-cors-headers
```

### Enter into back-end directory
```bash
cd extrasum_back/ # location: extrasum/back/extrasum_back
```
### Download data
Download [https://drive.google.com/file/d/13lErhO3rZ1gZaOPmjPwZryc8nNJKW9Wt/view?usp=sharing](https://drive.google.com/file/d/13lErhO3rZ1gZaOPmjPwZryc8nNJKW9Wt/view?usp=sharing), extract and copy it to `extrasum/back/extrasum_back`.  

The path must be `extrasum/back/extrasum_back/data/`.

### Migrate
```
python manage.py migrate
```

### Run back-end
```bash
python manage.py runserver
```

### Run front-end
Open a new terminal.  
  
npm must be installed.  
  
Enter into `cd extrasum/front/extrasum/`.  
  
Run ```npm install```.
  
Finally, run ```npm start```.

