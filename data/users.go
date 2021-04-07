package data

type Users struct {
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