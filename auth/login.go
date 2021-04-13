package auth

import(
	// Import Fiber Swagger
	"github.com/arsmn/fiber-swagger/v2"
	// Import Go Fiber
	"github.com/gofiber/fiber/v2"
	// Side Effect import for auto-generated swagger documentation
	_ "boilerplate_go_rest/docs"
	"webshowcase-boilerplate_go_rest/database"

)

// Register godoc
// @Summary Register a new user
// @Description Add user to database
// @ID Register
// @Accept  json
// @Produce  json
// @Tags User
// @Param userID path int true "User ID"
// @Success 200 {object} RegisterUser
// @Failure 400 {object} HTTPError
// @Failure 404 {object} HTTPError
// @Failure 500 {object} HTTPError
// @Router /api/user/ [post]
func RegisterUser(c *fiber.Ctx) error {
	// return c.JSON(User{
	// 	UserID: c.Params("userID"),
	// 	Username: c.Params("username"),
	// 	UserFirstName: c.Params("userFirstName"),
	// 	UserLastName: c.Params("userLastName"),
	// 	Password: c.Params("password"),
	// 	BatchYear: c.Params("batchYear"),
	// 	Address: c.Params("address"),
	// 	BinusianID: c.Params("binusianID"),
	// 	Email: c.Params("email"),
	// 	PhoneNum: c.Params("phoneNum"),
	// 	RoleID: c.Params("roleID"),
	// })
	db := database.DBConn

	user := new(User)
	if err := c.BodyParser(user); err != nil {
		c.Status(503).Send(err)
		return
	}

	db.Create(&user)
	c.JSON(user)
}

func GetUser(c *fiber.Ctx) error {
	userID := c.Params("userID")
	db := database.DBConn
	var user User
	db.Find(&user, userID)
	c.JSON(user)
}


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
	RoleID int 

}

type HTTPError struct {
	Status  string
	Message string
}