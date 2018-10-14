package praytime

// User - Represents user table
type User struct {
	FCMToken string `json:"fcmToken" firestore:"fcmToken"`
}
