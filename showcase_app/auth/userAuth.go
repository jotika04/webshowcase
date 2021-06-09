package auth

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"golang.org/x/crypto/bcrypt"
	"fmt"
	"time"
	// "os"
	// "strings"
	"strconv"
	jwt "github.com/form3tech-oss/jwt-go"
	

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

type Claim struct {
	ClaimID int `json:"claimID"`
	Issuer string `json:"issuer"`
	ExpiresAt int `json:"expiresAt"`
	Subject string `json:"subject"`
	IssuedAt int `json:"issuedAt"`
}

type Claims struct {
  jwt.StandardClaims
  ID uint `gorm:"primaryKey"`
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
	// if err != nil {
	// 	return err
	// }
	// if count, _ := row.RowsAffected(); count != 1 {
	// 	return errors.New("Error inserting row value")
	// }
	// return nil

	// return c.JSON(RequestResponse{
	// 	Status: 201,
	// 	Message: "Register Success",
	// })
	Login(c)
	return err

	// setting up the authorization cookies
    // accessToken, refreshToken := GenerateTokens(user.Username)
    // accessCookie, refreshCookie := GetAuthCookies(accessToken, refreshToken)
    // c.Cookie(accessCookie)
    // c.Cookie(refreshCookie)

    // return c.Status(fiber.StatusOK).JSON(fiber.Map{
    //     "access_token":  accessToken,
    //     "refresh_token": refreshToken,
    // })
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
	userID := c.Params("userID")
	db := database.DBConn
	var user User
	
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
			// return err
		}
	return c.JSON(user)

	
}
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
		// // Create token
		// token := jwt.New(jwt.SigningMethodHS256)

		// // Set claims
		// claims := token.Claims.(jwt.MapClaims)
		// claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
		// // Generate encoded token and send it as response.
		// t, err := token.SignedString([]byte("secret"))
		// if err != nil {
		// 	return c.SendStatus(fiber.StatusInternalServerError)
		// }

		// return c.JSON(fiber.Map{"token": t})

		// return c.JSON(RequestResponse{
		// 	Status: 200,
		// 	Message: "Login Success",
		// })

		// setting up the authorization cookies
	    accessToken, refreshToken := GenerateTokens(strconv.Itoa(user.UserID))
	    accessCookie, refreshCookie := GetAuthCookies(accessToken, refreshToken)
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

// var jwtKey = []byte(os.Getenv("PRIV_KEY"))
var jwtKey = []byte("secret")

// GenerateTokens returns the access and refresh tokens
func GenerateTokens(uuid string) (string, string) {
    claim, accessToken := GenerateAccessClaims(uuid)
    refreshToken := GenerateRefreshClaims(claim)

    return accessToken, refreshToken
}

// GenerateAccessClaims returns a claim and an access_token string
func GenerateAccessClaims(uuid string) (*Claims, string) {

    t := time.Now()
    claim := &Claims{
        StandardClaims: jwt.StandardClaims{
            Issuer:    uuid,
            ExpiresAt: t.Add(15 * time.Minute).Unix(),
            Subject:   "access_token",
            IssuedAt:  t.Unix(),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        panic(err)
    }

    return claim, tokenString
}

// GenerateRefreshClaims returns refresh_token
func GenerateRefreshClaims(cl *Claims) string {
	db := database.DBConn
	var claims []Claim
 //    result := db.Where(&Claim{
 //        StandardClaims: jwt.StandardClaims{
 //            Issuer: cl.Issuer,
 //        },
 //    }).Find(&Claim{})
    result, err := db.Query("Select * From claim Where issuer=?", cl.Issuer)
	var newclaim Claim
    for result.Next() {
        err := result.Scan(&newclaim.Issuer, &newclaim.ExpiresAt, &newclaim.Subject, &newclaim.IssuedAt)
        if err != nil {
            fmt.Println(err)
        }
        claims = append(claims, newclaim)
    }

    // checking the number of refresh tokens stored.
    // If the number is higher than 3, remove all the refresh tokens and leave only new one.
    if len(claims) > 3 {
        // db.Where(&Claim{
        //     StandardClaims: jwt.StandardClaims{Issuer: cl.Issuer},
        // }).Delete(&Claim{})
        db.Exec("DELETE FROM claim WHERE issuer=?", cl.Issuer)
        fmt.Println("Tokens deleted")
    }

    t := time.Now()
    refreshClaim := &Claims{
        StandardClaims: jwt.StandardClaims{
            Issuer:    cl.Issuer,
            ExpiresAt: t.Add(7 * 24 * time.Hour).Unix(),
            Subject:   "refresh_token",
            IssuedAt:  t.Unix(),
        },
    }

    // create a claim on DB
    // db.Create(&refreshClaim)
    db.Exec("INSERT INTO claim (issuer, expiresAt, subject, issuedAt) VALUES(?,?,?,?)", cl.Issuer, t.Add(30 * 24 * time.Hour).Unix(), "refresh_token", t.Unix())

    refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaim)
    refreshTokenString, err := refreshToken.SignedString(jwtKey)
    if err != nil {
        panic(err)
    }

    return refreshTokenString
}

// SecureAuth returns a middleware which secures all the private routes
func SecureAuth() func(*fiber.Ctx) error {
    return func(c *fiber.Ctx) error {
        accessToken := c.Cookies("access_token")
        claims := new(Claims)

        token, err := jwt.ParseWithClaims(accessToken, claims,
            func(token *jwt.Token) (interface{}, error) {
                return jwtKey, nil
            })

        if token.Valid {
            if claims.ExpiresAt < time.Now().Unix() {
                return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                    "error":   true,
                    "general": "Token Expired",
                })
            }
        } else if ve, ok := err.(*jwt.ValidationError); ok {
            if ve.Errors&jwt.ValidationErrorMalformed != 0 {
                // this is not even a token, we should delete the cookies here
                c.ClearCookie("access_token", "refresh_token")
                return c.SendStatus(fiber.StatusForbidden)
            } else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
                // Token is either expired or not active yet
                return c.SendStatus(fiber.StatusUnauthorized)
            } else {
                // cannot handle this token
                c.ClearCookie("access_token", "refresh_token")
                return c.SendStatus(fiber.StatusForbidden)
            }
        }

        c.Locals("id", claims.Issuer)
        return c.Next()
    }
}

// GetAuthCookies sends two cookies of type access_token and refresh_token
func GetAuthCookies(accessToken, refreshToken string) (*fiber.Cookie, *fiber.Cookie) {
    accessCookie := &fiber.Cookie{
        Name:     "access_token",
        Value:    accessToken,
        Expires:  time.Now().Add(24 * time.Hour),
        HTTPOnly: true,
        Secure:   true,
    }

    refreshCookie := &fiber.Cookie{
        Name:     "refresh_token",
        Value:    refreshToken,
        Expires:  time.Now().Add(10 * 24 * time.Hour),
        HTTPOnly: true,
        Secure:   true,
    }

    return accessCookie, refreshCookie
}

// GetAccessToken generates and sends a new access token if there is a valid refresh token
func GetAccessToken(c *fiber.Ctx) error {
	type RefreshToken struct {
		RefreshToken string `json:"refresh_token"`
	}

	reToken := new(RefreshToken)
	if err := c.BodyParser(reToken); err != nil {
		return c.JSON(fiber.Map{"error": true, "input": "Please review your input"})
	}

	refreshToken := reToken.RefreshToken

    db := database.DBConn

    refreshClaims := new(Claims)
    token, _ := jwt.ParseWithClaims(refreshToken, refreshClaims,
        func(token *jwt.Token) (interface{}, error) {
            return jwtKey, nil
        })

    var claims []Claim
    result, err := db.Query("Select * From claim Where issuer=? AND expiresAt=? AND issuedAt=?", refreshClaims.Issuer, refreshClaims.ExpiresAt, refreshClaims.IssuedAt)
	var newclaim Claim
    for result.Next() {
        err := result.Scan(&newclaim.Issuer, &newclaim.ExpiresAt, &newclaim.Subject, &newclaim.IssuedAt)
        if err != nil {
            fmt.Println(err)
        }
        claims = append(claims, newclaim)
    }

    if len(claims) <= 0{
    	// no such refresh token exist in the database
    	fmt.Println(refreshClaims.Issuer, refreshClaims.ExpiresAt, refreshClaims.IssuedAt)
    	fmt.Println("no refresh tokens in db")
        c.ClearCookie("access_token", "refresh_token")
        return c.SendStatus(fiber.StatusForbidden)
    }

    // if res := db.Where(
    //     "expires_at = ? AND issued_at = ? AND issuer = ?",
    //     refreshClaims.ExpiresAt, refreshClaims.IssuedAt, refreshClaims.Issuer,
    // ).First(&Claims{}); res.RowsAffected <= 0 {
    //     // no such refresh token exist in the database
    //     c.ClearCookie("access_token", "refresh_token")
    //     return c.SendStatus(fiber.StatusForbidden)
    // }

    if token.Valid {
        if refreshClaims.ExpiresAt < time.Now().Unix() {
            // refresh token is expired
            fmt.Println("refresh token expired")
            c.ClearCookie("access_token", "refresh_token")
            return c.SendStatus(fiber.StatusForbidden)
        }
    } else {
        // malformed refresh token
        fmt.Println("refresh token malformed")
        c.ClearCookie("access_token", "refresh_token")
        return c.SendStatus(fiber.StatusForbidden)
    }

    _, accessToken := GenerateAccessClaims(refreshClaims.Issuer)

    c.Cookie(&fiber.Cookie{
        Name:     "access_token",
        Value:    accessToken,
        Expires:  time.Now().Add(24 * time.Hour),
        HTTPOnly: true,
        Secure:   true,
    })

    if err != nil{
    	panic(err)
    }

    return c.JSON(fiber.Map{"access_token": accessToken})
}

