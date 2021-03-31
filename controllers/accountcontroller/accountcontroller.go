package accountcontroller

import (
	"net/http"
	"html/template"
	"github.com/gorilla/securecookie"
	"golang.org/x/crypto/bcrypt"
	"github.com/kataras/go-sessions"
	"fmt"
	"database/sql"
	"log"
	_ "github.com/go-sql-driver/mysql"
	"time"

)

var cookieHandler = securecookie.New(
	securecookie.GenerateRandomKey(64),
	securecookie.GenerateRandomKey(32))

var Db *sql.DB
var err error

type User struct {
	UserID int
	Username string
	UserFirstName string
	UserLastName string
	Password string
	BatchYear int
	Address string
	BinusianID int
	Email string
	PhoneNum string

}

func Connect_db() {
    db, err := sql.Open("mysql", "root:pwd@tcp(127.0.0.1)/showcasedb")
    db.SetConnMaxLifetime(time.Second)
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

func QueryUser(username string) User {
    var user = User{}
    err = Db.QueryRow(`
        SELECT userID, 
        username, 
        userFirstName, 
        userLastName, 
        password,
        batchYear,
        address,
        binusianID,
        email,
        phoneNum 
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
        )
    return user
}

// func IndexPage(w http.ResponseWriter, r *http.Request){
// 	u := &User{}
// 	tmpl, _ := template.ParseFiles("views/accountcontroller/base.html", "views/accountcontroller/index.html", "views/accountcontroller/main.html")
// 	err := tmpl.ExecuteTemplate(w, "base", u)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 	}
// }

// func Login(w http.ResponseWriter, r *http.Request){
// 	name := r.FormValue("uname")
// 	pass := r.FormValue("password")

// 	redirect := "/"
// 	if name != "" && pass != ""{
// 		setSession(&User{Username: name, Password: pass}, w)
// 		redirect = "/example"

// 	}
// 	http.Redirect(w, r,redirect, 302)
// }

// func Logout(w http.ResponseWriter, r *http.Request){
// 	clearSession(w)
// 	http.Redirect(w, r, "/", 302)
// }

// func ExamplePage(w http.ResponseWriter, r *http.Request){
// 	tmpl, _ := template.ParseFiles("views/accountcontroller/base.html", "views/accountcontroller/index.html", "views/accountcontroller/internal.html")
// 	username := getUserName(r)
// 	if username != ""{
// 		err := tmpl.ExecuteTemplate(w, "base", &User{Username: username})
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 		}
// 	}
// }

// func Signup(w http.ResponseWriter, r *http.Request){
// 	switch r.Method {
// 	case "GET":
// 		tmpl, _ := template.ParseFiles("views/accountcontroller/signup.html", "views/accountcontroller/index.html", "views/accountcontroller/base.html")
// 		u := &User{}
// 		tmpl.ExecuteTemplate(w, "base", u)
// 	case"POST":
// 		f := r.FormValue("fName")
// 		l := r.FormValue("lName")
// 		em := r.FormValue("email")
// 		un := r.FormValue("userName")
// 		pass := r.FormValue("password")

// 		u := &User{Fname: f, Lname: l, Email: em, Username: un, Password: pass}
// 		setSession(u, w)
// 		http.Redirect(w, r, "/example", 302)
// 	}
// }

func Home(w http.ResponseWriter, r *http.Request) {
	session := sessions.Start(w, r)
	if len(session.GetString("username")) == 0 {
		http.Redirect(w, r, "/login", 301)
	}

	var data = map[string]string{
		"username": session.GetString("username"),
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

func Register(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.ServeFile(w, r, "views/accountcontroller/register.html")
		return
	}

	username := r.FormValue("username")
	email := r.FormValue("email")
	userFirstName := r.FormValue("userFirstName")
	userLastName := r.FormValue("userLastName")
	password := r.FormValue("password")


	user := QueryUser(username)

	if (User{}) == user {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

		if len(hashedPassword) != 0 && checkErr(w, r, err) {
			stmt, err := Db.Prepare("INSERT INTO user SET username=?, password=?, userFirstName=?, userLastName=?, email=?")
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
}

func Login(w http.ResponseWriter, r *http.Request) {
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

	//deskripsi dan compare password
	var password_tes = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if password_tes == nil {
		//login success
		session := sessions.Start(w, r)
		session.Set("username", user.Username)
		session.Set("name", user.UserFirstName)
		http.Redirect(w, r, "/", 302)
	} else {
		//login failed
		http.Redirect(w, r, "/login", 302)
	}

}
func Logout(w http.ResponseWriter, r *http.Request) {
	session := sessions.Start(w, r)
	session.Clear()
	sessions.Destroy(w, r)
	http.Redirect(w, r, "/", 302)
}