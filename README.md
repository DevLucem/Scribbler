# Svelte + Cloud Run WebSockets
### [Group Scribbler Demo](https://scrbbl-5tq4v2vhga-de.a.run.app/)

// todo show the image here
![image](https://user-images.githubusercontent.com/22216995/193905040-45fa6e1e-ebd2-4b89-96b8-7781966e55e0.png)


#### A clone of [PWA](https://pwa-progressive.web.app) Starter Template
##### ...with all the good stuff

---

### Setting Up
1. Clone this repo
   
`git clone https://github.com/devlucem/scribbler.git`
2. Install All Dependencies
   
`npm install && cd cloud && npm install && cd ..`
3. Once you build the frontend and prepare the files for deployment, you can run locally with `node .`. Alternatively, change the [Server Index](cloud/index.js) port to one that is not in use and listen to it in the svelte application

---



### Deploying to Cloud Run
1. Build the web app in [Home Folder](./)

`npm run build`

2. Prepare files for deployment in [Cloud Folder](./cloud)

```
robocopy docs cloud/docs
cd cloud
```

3. Upload Cloud

`gcloud run deploy service --allow-unauthenticated --source=.`

A run.app access URL will be generated for you.




# Made With ♥
```
(                   (                            
)\ )                )\ )                         
(()/(     (    )    (()/(   (          (     )    
/(_))   ))\  /((    /(_)) ))\   (    ))\   (     
(_))_   /((_)(_))\  (_))  /((_)  )\  /((_)  )\  '
|   \ (_))  _)((_) | |  (_))(  ((_)(_))  _((_))  
| |) |/ -_) \ V /  | |__| || |/ _| / -_)| '  \()
|___/ \___|  \_/   |____|\_,_|\__| \___||_|_|_|  
```
