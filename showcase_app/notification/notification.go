package notification

import(
	"github.com/gofiber/fiber/v2"
	"backend_rest/database"
	"fmt"
	"time"
	util "backend_rest/util"
	model "backend_rest/model"
	"strconv"
)
	
// GetNotification godoc
// @Summary Display all notifications 
// @Description Get all notifications of user by userID 
// @Tags Notification
// @Accept  json
// @Produce  json
// @Param userID path int true "User ID"
// @Success 200 {object} model.Notification
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/user/notification/:userID [get]
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
	var notifs []*model.Notification

    rows, err := db.Query(`
        SELECT *
        FROM notification WHERE userID=?
        `, userID)

	if err != nil {
		fmt.Println(err.Error())
		// return err, nil
	}

	var notif *model.Notification = &model.Notification{}
    for rows.Next() {
        err := rows.Scan(&notif.NotificationID, &notif.UserID, &notif.ProjectID, &notif.Notif_text)
        if err != nil {
            fmt.Println(err)
        }
        notifs = append(notifs, notif)
    }

	return c.JSON(notifs)

}

// ReadNotification godoc
// @Summary Read notification 
// @Description Read a notification and delete it from database
// @Tags Notification
// @Accept  json
// @Produce  json
// @Param notificationID path int true "Notification ID"
// @Success 200 {object} model.HTTPError
// @Failure 400 {object} model.HTTPError
// @Failure 404 {object} model.HTTPError
// @Failure 500 {object} model.HTTPError
// @Router /api/v1/user/notification/read/:notificationID [delete]
func ReadNotification(c *fiber.Ctx)error{
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

    var requestroleID int
    db := database.DBConn
    err = db.QueryRow("SELECT roleID FROM user WHERE userID=?", userID).Scan(&requestroleID)
    if err != nil {
			fmt.Println(err.Error())
			// return err, nil
	}
    if requestroleID == 4{
    	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "unauthorized for notification page",
        }) 
    }

	notificationID := c.Params("notificationID")

	var notif_userID int
	err = db.QueryRow("SELECT userID FROM notification WHERE notificationID=?", notificationID).Scan(&notif_userID)
    if err != nil {
			fmt.Println(err.Error())
			// return err, nil
	}

	if notif_userID != userID{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": true,
            "msg":   "userID mismatch",
        })
	}

    db.Exec("DELETE FROM notification WHERE notificationID=?", notificationID)
		if err != nil {
			fmt.Println(err.Error())
			// return err, nil
		}

	return c.JSON(model.HTTPError{
		Status: 200,
		Message: "Notification Read",
	})

}