# RADsum
A web application for extractive summarization based on SummaRuNNer.

<p float="center">
  <img src="/miniature.png" width="500" />
</p>

## Run on local
### Clone project
```bash
git clone https://github.com/Baragouine/radsum_app.git
```

### Create env (conda)
```bash
conda create --name RADSUM_APP python=3.9
```

### Activate env
```bash
conda activate RADSUM_APP
```

### Enter into back-end directory
```bash
cd radsum_app/back/
```

### Install dependencies
```bash
pip install -r requirements.txt
conda install pytorch-geometric -c rusty1s -c conda-forge
```

## Install nltk data
To install nltk data:
  - Open a python console.
  - Type ``` import nltk; nltk.download()```.
  - Download all data.
  - Close the python console.

### Install Django REST framework and Django cors header
```bash
pip install django
pip install djangorestframework
pip install django-cors-headers
```

### Enter into back-end directory
```bash
cd back/ # location: radsum_app/back/back
```

### Download data
Download [https://drive.google.com/file/d/1NfVJa21NIGyX9USrnS-hpqnaWitORqP0/view?usp=sharing](https://drive.google.com/file/d/1NfVJa21NIGyX9USrnS-hpqnaWitORqP0/view?usp=sharing), extract and copy it to `radsum_app/back/back`.  

The path must be `radsum_app/back/back/data/`.

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
  
npm must be installed (version 9.8.0 recommended).  
  
Enter into `cd radsum_app/front/radsum/`.  

Run ```npm install```.

Run ```npm install react-scripts```.
  
Finally, run ```npm start```.

## License
&copy; 2023 Raoufdine SAID & Adrien GUILLE - All rights reserved. This software is distributed under the [MIT License](LICENSE).
