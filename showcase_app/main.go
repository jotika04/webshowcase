package main

import (
	// Import Fiber Swagger
	swagger "github.com/arsmn/fiber-swagger/v2"
	// Import Go Fiber
	"github.com/gofiber/fiber/v2"
	// Side Effect import for auto-generated swagger documentation
	"backend_rest/auth"
	"backend_rest/database"
	_ "backend_rest/docs"
	"backend_rest/project"
	"backend_rest/notification"
	"backend_rest/util"
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"

	jwtware "github.com/gofiber/jwt/v2"
)

func connect_db() {
	var err error
	database.DBConn, err = sql.Open("mysql", "root:my-secret-pw@tcp(127.0.0.1:3306)/showcasedb?parseTime=true")
	// database.DBConn, err = sql.Open("mysql", "root:my-secret-pw@tcp(mysql:3306)/showcasedb")
	database.DBConn.SetMaxIdleConns(0)                  //No Idle connection
	database.DBConn.SetMaxOpenConns(400)                //Max connection to 400
	database.DBConn.SetConnMaxLifetime(time.Second * 5) //Connection dies after 5 seconds

	if err != nil {
		log.Fatal(err)
	}
	if err := database.DBConn.Ping(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Database connection successfully opened")

	// _, err = database.DBConn.Exec("CREATE DATABASE IF NOT EXISTS showcasedb")
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println("showcasedb is successfully created")

}

func setupRoutes(app *fiber.App) {
	// Add endpoint to serve swagger documentation
	app.Get("/swagger/*", swagger.New(swagger.Config{ // custom
		URL:         "/swagger/doc.json",
		DeepLinking: false,
	}))

	// user authentication endpoint
	app.Post("/api/v1/user/register", auth.RegisterUser)
	app.Post("/api/v1/user/login", auth.Login)
	app.Get("/api/v1/get-access-token", util.GetAccessToken)

	// user profile endpoint
	app.Get("/api/v1/user/:userID", auth.GetUser)
	app.Patch("/api/v1/user/update-profile", auth.UpdateProfile)
	app.Patch("/api/v1/user/update-role", auth.UpdateRole)

	// project endpoints
	app.Get("/api/v1/project/:projectID", project.GetProject)
	app.Get("/api/v1/unverified-project", project.GetUnverifiedProjects)
	app.Post("/api/v1/project/submit", project.SubmitProject)
	app.Patch("/api/v1/project/validate", project.ValidateProject)

	//notification endpoint
	app.Get("/api/v1/user/notification/:userID", notification.GetNotification)



}

// @title Fiber Example API
// @version 1.0
// @description This is a sample swagger for Fiber
// @contact.name API Support
// @contact.email youremail@provider.com
// @host localhost:3000
// @BasePath /
func main() {
	// Create new Fiber application
	app := fiber.New()

	connect_db()

	defer database.DBConn.Close()

	setupRoutes(app)

	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte("secret"),
	}))

	// Listen on the port '3000'
	app.Listen(":3000")
}

