package praytime

// User - Represents user table
type User struct {
	ID        string          `json:"id" firestore:"id"`
	FCMTokens map[string]bool `json:"fcmTokens" firestore:"fcmTokens"`
}
