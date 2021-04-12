FROM golang:1.16.3-alpine3.13
RUN apk add git
WORKDIR /go/src/showcase-backend/docs/cmd/showcase-server
COPY . .
RUN go mod tidy
RUN go get -d -v ./...
RUN go install -v ./...

EXPOSE 8080
CMD ["showcase-server"]