package notification

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"fmt"
	"time"
	util "backend_rest/util"
)
	

type Notification struct {
	NotificationID int `json: notificationID`
	ProjectID int `json:"projectID"`
	UserID int `json:"userID"`
	Notif_text string `json:"notif_text"`
}

type HTTPError struct {
	Status  string
	Message string
}

func GetNotification(c *fiber.Ctx)error{
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
	var notifs []Notification

    rows, err := db.Query(`
        SELECT *
        FROM notification WHERE userID=?
        `, userID)

	if err != nil {
		fmt.Println(err.Error())
		// return err, nil
	}

	var notif Notification
    for rows.Next() {
        err := rows.Scan(&notif.NotificationID, &notif.UserID, &notif.ProjectID, &notif.Notif_text)
        if err != nil {
            fmt.Println(err)
        }
        notifs = append(notifs, notif)
    }

	return c.JSON(notifs)

}