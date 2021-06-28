package auth

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"golang.org/x/crypto/bcrypt"
	"fmt"
	"time"
	"strconv"
	util "backend_rest/util"
	model "backend_rest/model"

)

// Register godoc
// @Summary Register a new user
// @Description Add user to database
// @Tags User Authentication
// @Accept  json
// @Produce  json
// @Param user body model.RegisterUser true "Register User"
// @Success 200 {object} model.Token
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/user/register [post]
func RegisterUser(c *fiber.Ctx)error{
	db := database.DBConn

	var user *model.RegisterUser = &model.RegisterUser{}


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
		return c.JSON(model.HTTPError{
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
// @Tags User Profile
// @Accept  json
// @Produce  json
// @Param userID path int true "Get User Profile"
// @Success 200 {object} model.User
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
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
	var user *model.User = &model.User{}
	
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
// @Tags User Authentication
// @Accept  json
// @Produce  json
// @Param user body model.LoginUser true "Login User"
// @Success 200 {object} model.Token
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/user/login [post]
func Login(c *fiber.Ctx)error{
	var user *model.LoginUser = &model.LoginUser{}

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


	    return c.Status(fiber.StatusOK).JSON(model.Token{
	        Access_token:  accessToken,
	        Refresh_token: refreshToken,
	    })


		} else {
			return c.JSON(model.HTTPError{
				Status: 401,
				Message: "Unauthorized Login",
			})
		}

}

// UpdateProfile godoc
// @Summary Update user profile
// @Description Update user profile by userID in token
// @Tags User Profile
// @Accept  json
// @Produce  json
// @Param user body model.UpdateProfile true "Update Profile"
// @Success 200 {object} model.HTTPError
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/user/update-profile [patch]
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

    var user *model.UpdateProfile = &model.UpdateProfile{}

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
	return c.JSON(model.HTTPError{
		Status: 200,
		Message: "Profile Updated",
	})
}

// UpdateRole godoc
// @Summary Update user role
// @Description Update user profile by userID in token
// @Tags Admin
// @Accept  json
// @Produce  json
// @Param user body model.UpdateRole true "Update Role"
// @Success 200 {object} model.HTTPError
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/user/update-role [patch]
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

    var user *model.UpdateRole = &model.UpdateRole{}

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
	return c.JSON(model.HTTPError{
		Status: 200,
		Message: "User Role Updated",
	})

}
