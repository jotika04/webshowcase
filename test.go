package main

import (
	"net/http"
	"github.com/gorilla/mux"

	"html/template"
	"golang.org/x/crypto/bcrypt"
	// "github.com/kataras/go-sessions/v3"
	"fmt"
	"database/sql"
	"log"
	_ "github.com/go-sql-driver/mysql"
	"time"

	"github.com/go-openapi/runtime/middleware"
	"github.com/jotika04/webshowcase/showcase-backend/docs/restapi/operations/user"
	"github.com/jotika04/webshowcase/showcase-backend/docs/models"
)


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

func QueryUser(username string) (*models.RegisterUser) {
    userInfo := models.RegisterUser{}
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
            &userInfo.UserID,
            &userInfo.Username,
            &userInfo.UserFirstName, 
            &userInfo.UserLastName,
            &userInfo.Password,
            &userInfo.BatchYear,
            &userInfo.Address,
            &userInfo.BinusianID,
            &userInfo.Email,
            &userInfo.PhoneNum,
            &userInfo.RoleID,
        )
        if err != nil {
			return nil, err
		}
    return &userInfo, nil
}

func home(w http.ResponseWriter, r *http.Request) {
	// session := sessions.Start(w, r)

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

func register() (userInfo *models.RegisterUser) {

	password := []byte(*userInfo.Password)


	user := QueryUser(username)

	hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	row, err := db.Exec("INSERT into customer (email, userFirstName, userLastName, username, password) values (?,?,?,?,?)", userInfo.Email, userInfo.UserFirstName, userInfo.UserLastName, userInfo.Username, hashedPassword)
	if err != nil {
		return err
	}
	if count, _ := row.RowsAffected(); count != 1 {
		return errors.New("Error inserting row value")
	}
	return nil
	
}

func (impl *registerImpl) Handle(params user.RegisterParams) middleware.Responder {
	err := impl.customerInfoHandler.RegisterNewUser(impl.dbClient, params.Signup)
	if err != nil {
		fmt.Println(err.Error())
		if strings.Contains(err.Error(), "Duplicate entry") {
			// if strings.Contains(err.Error(), "phoneNo_UNIQUE") {
			// 	return user.NewRegisterOK().WithPayload(&models.SuccessResponse{Success: false, Message: "Mobile already registered"})
			// }
			if strings.Contains(err.Error(), "email_UNIQUE") {
				return user.NewRegisterOK().WithPayload(&models.SuccessResponse{Success: false, Message: "Email already registered"})
			}
		}
		return user.NewRegisterInternalServerError().WithPayload("Error registering user")
	}
	return user.NewRegisterOK().WithPayload(&models.SuccessResponse{Success: true, Message: "User Registered successfully"})

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

}


func main (){

	connect_db()
	// routes()
	

	defer db.Close()

	http.ListenAndServe(":8080", nil)
}