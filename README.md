# Docker Microservice - Post, Comment, Moderation & Event-Bus/Query

[Docker/REACT] This project is a Microservice based on REACT and Docker.

## Dockers

> docker system prune

> docker images

> docker run -it <user>/posts sh # to have a terminal

---

> docker ps

> docker logs <id from docker ps>

> docker build -t <user>/<service name folder> .

> docker build -t <user>/<service_name>:<version> .

> docker run <id from docker ps>

Example for each service in this example
docker build -t pob/posts:0.0.1 .

## Kubernetes

Folder for installation: infrastructures / k8s

> Run command: kubectl apply -f posts.yaml

> Validation: kubectl get pods

> kubectl logs <id_pod>

Example: kubectl logs posts

```
[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Posts on PORT 4000
```

> kubectl exec -it pod <pod_name> <CMD>

Example: kubectl exec -it posts sh

> kubectl delete pod <pod_name>

Example: kubectl delete pod posts

> kubectl apply -f <pod_name> # Process a config file

Example: kubectl apply -f posts.yaml

> kubectl describe pod <pod_name>

Example: kubectl describe pod posts

> kubectl get deployments

### Add/delete additional pods

Folder for installation: infrastructures / k8s

> kubectl apply -f post-depl.yaml
> Result: deployment.apps/posts-depl configured

### Modification and rebuild

This example is for the posts service

### Node PORT

#### Docker

> cd posts
> Edit "index.js" and add a console.log("V105")
> Run: docker build -t <username>/posts .
> Run: docker push <username>/posts

#### Kubernetes

> k get deployments
> kubectl rollout restart deployment <deployment_name>/posts-depl
> kubectl logs <deployment_name>/

### Activate "k get pods"

Create an alias kubectl to k under ZSH shell.

#### For Mac with ZSH terminal:

Neovim installed and press I to edit and CTRL + X to save

- nvim ~/.zshrc
  INSERT: alias k="kubectl"
