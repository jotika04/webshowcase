package util

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"fmt"
	"time"
	jwt "github.com/form3tech-oss/jwt-go"
)

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
