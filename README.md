# Production viable Microservice -

Express, Node and deploy using docker, k8s and Skaffold without using a cloud service.

## Skaffold

This service is a manager for k8s in order to produce updated services without doing them manually.

> skaffold dev

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

## Modification in a service

Step 1: Build Docker Image (For rebuild after modification - must do)

> docker build -t pob944/event-bus .

Step 2: Push the image to Docker Bus (For rebuild after modification - must do - Stop after)

> docker push pob944/event-bus

Step 3: roll out

> k get deployments

> kubectl rollout restart deployment <deployment_name> (eg: posts-depl)

> kubectl logs <deployment_name>/

> k get pods (see time online)

### Add a Service

Step 1: Build Docker Image

> docker build -t pob944/event-bus .

Step 2: Push the image to Docker Bus

> docker push pob944/event-bus

Step 3: Deploy the service (Event-bus)

> In: cd infrastructures/k8s -> Create a "serviceName-depl.yaml"

> kubectl apply -f event-bus-depl.yaml
> Result new pod: deployment.apps/event-bus-depl created
> kubectl get pods

Step 4: Setup the cluster IP between POST and Event-Bus

> Create/Edit k8s
> kubectl apply -f event-bus-depy.yaml
> OTHERS: kubectl apply -f . (for all files)

Step 5: confirmation service

> k get pods
> k get service
> Result: CluterIP service

Step 6: Enable communication

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
