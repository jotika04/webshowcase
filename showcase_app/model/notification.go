package model

type Notification struct {
	NotificationID int `json: notificationID example:"1"`
	ProjectID int `json:"projectID" example:"1"`
	UserID int `json:"userID" example:"1"`
	Notif_text string `json:"notif_text" example:"project successfully submitted"`
}
