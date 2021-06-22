package auth

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"golang.org/x/crypto/bcrypt"
	"fmt"
	"time"
	"strconv"
	util "backend_rest/util"
	

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

type RequestResponse struct {
	Status  int
	Message string
}

// Register godoc
// @Summary Register a new user
// @Description Add user to database
// @Accept  json
// @Produce  json
// @Param user body User true 
// @Success 200 {object} Login
// @Failure 400 {object} HTTPError
// @Failure 404 {object} HTTPError
// @Failure 500 {object} HTTPError
// @Router /api/v1/user/register [post]
func RegisterUser(c *fiber.Ctx)error{
	db := database.DBConn

	user := new(User)


	if err := c.BodyParser(user); err != nil {
        return err
    }

    email := user.Email

	err := db.QueryRow(`
		Select email From user Where email=?
		`, email).
		Scan(
			&user.Email,
		)

	if err == nil {
		return c.JSON(RequestResponse{
			Status: 201,
			Message: "Email is already Registered",
		})
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

	Login(c)
	return err
}

// GetUser godoc
// @Summary Query user info
// @Description Get user info by userID in token
// @Accept  json
// @Produce  json
// @Param userID path int true "User ID"
// @Success 200 {object} User
// @Failure 400 {object} HTTPError
// @Failure 404 {object} HTTPError
// @Failure 500 {object} HTTPError
// @Router /api/v1/user/:userID [get]
func GetUser(c *fiber.Ctx)error{
	now := time.Now().Unix()
	claims, err := util.ExtractTokenMetadata(c)
	if err != nil {
        // Return status 500 and JWT parse error.
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": true,
            "msg":   err.Error(),
        })
    }
    expires := claims.Expires

    // Checking, if now time greather than expiration from JWT.
    if now > expires {
        // Return status 401 and unauthorized error message.
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized, check expiration time of your token",
        })
    }

	userID := c.Params("userID")

	issuer := claims.Issuer
    if issuer != userID{
    	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "userID mismatch",
        })
    }

	db := database.DBConn
	var user User
	
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
			// return err
		}
	return c.JSON(user)

	
}

// Login godoc
// @Summary Login user
// @Description Return tokens for authenticated users
// @ID Login
// @Accept  json
// @Produce  json
// @Tags User
// @Param user body User true 
// @Success 200 {object} User
// @Failure 400 {object} HTTPError
// @Failure 404 {object} HTTPError
// @Failure 500 {object} HTTPError
// @Router /api/user/:userID [post]
func Login(c *fiber.Ctx)error{
	user := new(User)

	if err := c.BodyParser(user); err != nil {
            return err
    }
    email := user.Email
    password := user.Password

	db := database.DBConn
	err := db.QueryRow(`
		Select password, userID From user Where email=?
		`, email).
		Scan(
			&user.Password,
			&user.UserID,
		)
		if err != nil {
			fmt.Println(err.Error())
			// return err, nil
		}
	password_compare := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if password_compare == nil {

		// setting up the authorization cookies
	    accessToken, refreshToken := util.GenerateTokens(strconv.Itoa(user.UserID))
	    accessCookie, refreshCookie := util.GetAuthCookies(accessToken, refreshToken)
	    c.Cookie(accessCookie)
	    c.Cookie(refreshCookie)

	    return c.Status(fiber.StatusOK).JSON(fiber.Map{
	        "access_token":  accessToken,
	        "refresh_token": refreshToken,
	    })

		} else {
			return c.JSON(RequestResponse{
				Status: 401,
				Message: "Unauthorized Login",
			})
		}

}

func UpdateProfile(c *fiber.Ctx)error{
	now := time.Now().Unix()
	claims, err := util.ExtractTokenMetadata(c)
	if err != nil {
        // Return status 500 and JWT parse error.
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": true,
            "msg":   err.Error(),
        })
    }
    expires := claims.Expires

    // Checking, if now time greather than expiration from JWT.
    if now > expires {
        // Return status 401 and unauthorized error message.
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized, check expiration time of your token",
        })
    }

    issuer := claims.Issuer

    userID, err := strconv.Atoi(issuer)

    user := new(User)

	if err = c.BodyParser(user); err != nil {
            return err
    }

    db := database.DBConn
	db.Exec(`
		UPDATE user SET userFirstName=?, userLastName=?, batchYear=?, address=?, phoneNum=? WHERE userID=?
		`, user.UserFirstName, user.UserLastName, user.BatchYear, user.Address, user.PhoneNum, userID)
		if err != nil {
			fmt.Println(err.Error())
			// return err, nil
		}
	return c.JSON(RequestResponse{
		Status: 200,
		Message: "Profile Updated",
	})
}

func UpdateRole(c *fiber.Ctx)error{
	now := time.Now().Unix()
	claims, err := util.ExtractTokenMetadata(c)
	if err != nil {
        // Return status 500 and JWT parse error.
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": true,
            "msg":   err.Error(),
        })
    }
    expires := claims.Expires

    // Checking, if now time greather than expiration from JWT.
    if now > expires {
        // Return status 401 and unauthorized error message.
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized, check expiration time of your token",
        })
    }

    issuer := claims.Issuer

    requestID, err := strconv.Atoi(issuer)

    db := database.DBConn

    var requestroleID int
    err = db.QueryRow("SELECT roleID FROM user WHERE userID=?", requestID).Scan(&requestroleID)
    if err != nil {
			fmt.Println(err.Error())
			// return err, nil
	}
    if requestroleID != 1{
    	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized, for admin use only",
        }) 
    }

    type UserRole struct{
    	UserID int
    	Role string
    }

    user := new(UserRole)

	if err := c.BodyParser(user); err != nil {
            return err
    }

    var roleID int
    err = db.QueryRow("SELECT roleID FROM role WHERE role=?", user.Role).Scan(&roleID)
    if err != nil {
			fmt.Println(err.Error())
			// return err, nil
	}

	db.Exec(`
		UPDATE user SET roleID=? WHERE userID=?
		`, roleID, user.UserID)
		if err != nil {
			fmt.Println(err.Error())
			// return err, nil
		}
	return c.JSON(RequestResponse{
		Status: 200,
		Message: "User Role Updated",
	})

}
