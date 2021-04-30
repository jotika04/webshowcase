FROM golang:1.16-alpine

# Add hello scripts
ADD initscript /initscript
RUN chmod +x /initscript

ADD wait /wait
RUN chmod +x /wait

WORKDIR /build

RUN go mod init backend_rest
RUN go get -u github.com/swaggo/swag/cmd/swag
COPY go.mod go.sum /build/
RUN go mod download

COPY . /build

RUN swag init

RUN go build -o apiserver .

