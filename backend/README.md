# RoadEye - Pune's Road Quality Tracking Platform

RoadEye is a real-time pothole and roadwork tracking web application that connects Pune's citizens with civic authorities to improve road maintenance and accountability.

## 🌟 Features

### For Citizens
- Report potholes and road issues with geolocation
- Upload photos and detailed descriptions
- Track repair progress in real-time
- Receive email notifications for status updates
- Upvote existing issues to signal urgency
- View ward-level statistics and analytics

### For PMC Officers
- Secure role-based access
- Manage and update issue reports
- View heatmaps of affected areas
- Access analytics dashboard
- Track resolution metrics

## 🚀 Tech Stack

- **Frontend**: React.js, Material-UI, Mapbox GL
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Maps**: Mapbox GL

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/roadeye.git
   cd roadeye
   ```

2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   - Create `.env` file in the server directory
   - Add required environment variables (see `.env.example`)

4. Start development servers:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
roadeye/
├── client/          # React Frontend
├── server/          # Express Backend
├── package.json     # Root package.json
└── README.md        # This file
```

## 🔧 Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@roadeye.com or open an issue in the repository. 