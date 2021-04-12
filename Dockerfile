FROM golang:1.16-alpine

WORKDIR /build

RUN go mod init boilerplate_go_rest
RUN go get -u github.com/swaggo/swag/cmd/swag
COPY go.mod go.sum /build/
RUN go mod download

COPY . /build

RUN swag init

RUN go build -o apiserver .

ENTRYPOINT ["/build/apiserver"]

