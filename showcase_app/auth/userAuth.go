package auth

import(
	// Import Fiber Swagger
	// "github.com/arsmn/fiber-swagger/v2"
	// Import Go Fiber
	"github.com/gofiber/fiber/v2"
	// Side Effect import for auto-generated swagger documentation
	// _ "boilerplate_go_rest/docs"
	"backend_rest/database"
	"golang.org/x/crypto/bcrypt"
	"fmt"

)

type User struct {
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

type HTTPError struct {
	Status  string
	Message string
}

type RegisterResponse struct {
	Message string
	Success bool
}

// Register godoc
// @Summary Register a new user
// @Description Add user to database
// @ID Register
// @Accept  json
// @Produce  json
// @Tags User
// @Param userID path int true "User ID"
// @Success 200 {object} User
// @Failure 400 {object} HTTPError
// @Failure 404 {object} HTTPError
// @Failure 500 {object} HTTPError
// @Router /api/user/ [post]
func RegisterUser(c *fiber.Ctx)error{
	db := database.DBConn

	user := new(User)


	if err := c.BodyParser(user); err != nil {
            return err
    }


	// password := []byte(*user.Password)
	password := &user.Password

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*password), bcrypt.DefaultCost)
	// if err != nil {
	// 	return err
	// }
	if err != nil {
			fmt.Println(err.Error())
			return err
	}
	db.Exec("INSERT into user (email, userFirstName, userLastName, username, password) values (?,?,?,?,?)", user.Email, user.UserFirstName, user.UserLastName, user.Username, hashedPassword)
	// if err != nil {
	// 	return err
	// }
	// if count, _ := row.RowsAffected(); count != 1 {
	// 	return errors.New("Error inserting row value")
	// }
	// return nil

	return c.JSON(RegisterResponse)
}

// GetUser godoc
// @Summary Query user
// @Description Get info of user from database
// @ID Getuser
// @Accept  json
// @Produce  json
// @Tags User
// @Param userID path int true "User ID"
// @Success 200 {object} User
// @Failure 400 {object} HTTPError
// @Failure 404 {object} HTTPError
// @Failure 500 {object} HTTPError
// @Router /api/user/:userID [post]
func GetUser(c *fiber.Ctx)error{
	// var err error
	userID := c.Params("userID")
	db := database.DBConn
	var user User
	// var err error
	// db.Find(&user, userID)

	// userInfo := User{}
    err := db.QueryRow(`
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
        FROM user WHERE userID=?
        `, userID).
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
		if err != nil {
			fmt.Println(err.Error())
			// return err, nil
		}
	return c.JSON(user)

	
    // return &userInfo, nil
}
func Login(c *fiber.Ctx)error{
	user := new(User)

	if err := c.BodyParser(user); err != nil {
            return err
    }
    email := user.Email
    password := user.Password

	db := database.DBConn
	err := db. QueryRow(`
		Select password From user Where email=?
		`, email).
		Scan(
			&user.Password,
		)
		if err != nil {
			fmt.Println(err.Error())
			// return err, nil
		}
	password_compare := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if password_compare == nil {
		// fmt.Println(email, password)
		return c.JSON("Login Success")

	} else {
		// fmt.Println(email, password)
		return c.JSON("Login failed")
	}

}
