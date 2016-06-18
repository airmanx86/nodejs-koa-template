# base-template
A generic template as a base for other templates

## How to use
1. Make a new git repository base on master branch of `base-template`.
```
mkdir your-service
cd your-service
git init
git fetch https://github.com/airmanx86/base-template.git
git reset --hard FETCH_HEAD
```
2. Create your remote repository and obtain the URL
```
git remote add origin https://github.com/your-name/your-service.git
git remote -v
git push origin master
```

## Contributing
Please read `CONTRIBUTING.md` to understand how best to contribute to this repo.
