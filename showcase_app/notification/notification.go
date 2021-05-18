package notification

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"fmt"
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
	userID := c.Params("userID")
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