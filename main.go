package main

import (
	"net/http"
	"github.com/gorilla/mux"

	"html/template"
	"golang.org/x/crypto/bcrypt"
	"github.com/kataras/go-sessions"
	"fmt"
	"database/sql"
	"log"
	_ "github.com/go-sql-driver/mysql"
	"time"

	"github.com/go-chi/chi"
	"github.com/swaggo/http-swagger"
	_ "github.com/swaggo/http-swagger/example/go-chi/docs"

)

// @title Showcase Swagger API
// @version 1.0
// @description Swagger API for Golang Project.
// @termsOfService http://swagger.io/terms/

// @host localhost:8080
// @BasePath /api/v1

// @schemes http

var db *sql.DB
var err error

type users struct {
	UserID int `json:"userID"`
	Username string `json:"username"`
	UserFirstName string `json:"userFirstName"`
	UserLastName string `json:"userLastName"`
	Password string `json:"password"`
	BatchYear int `json:"batchYear"`
	Address string `json:"address"`
	BinusianID int `json:"binusianID"`
	Email string `json:"email"`
	PhoneNum string `json:"phoneNum"`
	RoleID int `json:"roleID"`

}


func connect_db() {
    db, err = sql.Open("mysql", "root:my-secret-pw@tcp(127.0.0.1:3306)/showcasedb?parseTime=true")
    db.SetMaxIdleConns(0) //No Idle connection
	db.SetMaxOpenConns(400) //Max connection to 400
	db.SetConnMaxLifetime(time.Second * 5) //Connection dies after 5 seconds
    

    if err != nil {
        log.Fatal(err)
    }
    if err := db.Ping(); err != nil {
        log.Fatal(err)
    }
}

func checkErr(w http.ResponseWriter, r *http.Request, err error) bool {
	if err != nil {

		fmt.Println(r.Host + r.URL.Path)

		http.Redirect(w, r, r.Host+r.URL.Path, 301)
		return false
	}

	return true
}

func QueryUser(username string) users {
    var user = users{}
    err = db.QueryRow(`
        SELECT userID, 
        username, 
        userFirstName, 
        userLastName, 
        password,
        batchYear,
        address,
        binusianID,
        email,
        phoneNum,
        roleID 
        FROM user WHERE username=?
        `, username).
        Scan(
            &user.UserID,
            &user.Username,
            &user.UserFirstName, 
            &user.UserLastName,
            &user.Password,
            &user.BatchYear,
            &user.Address,
            &user.BinusianID,
            &user.Email,
            &user.PhoneNum,
            &user.RoleID,
        )
    return user
}

func home(w http.ResponseWriter, r *http.Request) {
	session := sessions.Start(w, r)

	if len(session.GetString("username")) == 0 {
		var data = map[string]string{
			"login": "false",
		}
		var t, err = template.ParseFiles("views/accountcontroller/home.html")
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		t.Execute(w, data)
		return
		// http.ServeFile(w, r, "views/accountcontroller/home.gohtml")
		// return
		// http.Redirect(w, r, "/login", 301)
	}

	var data = map[string]string{
		"username": session.GetString("username"),
		"login": "true",
		"message":  "Welcome to the Go !",
	}
	var t, err = template.ParseFiles("views/accountcontroller/home.html")
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	t.Execute(w, data)
	return

}

func register(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		// http.ServeFile(w, r, "views/accountcontroller/register.html")
		// return
		var data = map[string]string{
			"warning": "",
		}
		var t, err = template.ParseFiles("views/accountcontroller/register.html")
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		t.Execute(w, data)
		return
	}

	username := r.FormValue("username")
	email := r.FormValue("email")
	userFirstName := r.FormValue("userFirstName")
	userLastName := r.FormValue("userLastName")
	password := r.FormValue("password")
	checkPass := r.FormValue("checkPass")


	user := QueryUser(username)
	if len(password) < 8{
		fmt.Println("Password needs to be at least 8 characters")
		var data = map[string]string{
			"warning": "Password needs to be at least 8 characters",
		}
		var t, err = template.ParseFiles("views/accountcontroller/register.html")
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		t.Execute(w, data)
		return
	}
	if password == checkPass{
		if (users {}) == user{
			fmt.Println("Register Successful")
			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

			if len(hashedPassword) != 0 && checkErr(w, r, err) {
				stmt, err := db.Prepare("INSERT INTO user SET username=?, password=?, userFirstName=?, userLastName=?, email=?")
				if err == nil {
					_, err := stmt.Exec(&username, &hashedPassword, &userFirstName, &userLastName, &email)
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
						return
					}

					http.Redirect(w, r, "/login", http.StatusSeeOther)
					return
				}
			}
		} else {
			http.Redirect(w, r, "/register", 302)
		}
	} else {
		var data = map[string]string{
			"warning": "Password and Confirm Password does not match",
		}
		fmt.Println("Password and Confirm Password does not match")
		var t, err = template.ParseFiles("views/accountcontroller/register.html")
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		t.Execute(w, data)
		return

		// http.Redirect(w, r, "/register", 302, warning)
	}

	
}

func login(w http.ResponseWriter, r *http.Request) {
	session := sessions.Start(w, r)
	if len(session.GetString("username")) != 0 && checkErr(w, r, err) {
		http.Redirect(w, r, "/", 302)
	}
	if r.Method != "POST" {
		http.ServeFile(w, r, "views/accountcontroller/login.html")
		return
	}
	username := r.FormValue("username")
	password := r.FormValue("password")

	user := QueryUser(username)

	var password_tes = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if password_tes == nil {
		//login success
		fmt.Println("login success!!!")
		session := sessions.Start(w, r)
		session.Set("username", user.Username)
		session.Set("name", user.UserFirstName)
		http.Redirect(w, r, "/", 302)
		
	} else {
		//login failed
		fmt.Println("login failed!!!")
		http.Redirect(w, r, "/login", 302)
	}

}
func logout(w http.ResponseWriter, r *http.Request) {
	session := sessions.Start(w, r)
	session.Clear()
	sessions.Destroy(w, r)
	http.Redirect(w, r, "/", 302)
}

func routes(){
	r := mux.NewRouter()
	r.HandleFunc("/", home)
	r.HandleFunc("/login", login)
	r.HandleFunc("/logout", logout)
	r.HandleFunc("/register", register)
	http.Handle("/", r)

	r.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:1323/swagger/doc.json"), //The url pointing to API definition"
	))
}


func main (){

	connect_db()
	routes()
	

	defer db.Close()

	http.ListenAndServe(":8080", nil)
}