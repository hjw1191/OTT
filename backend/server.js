const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // JSON 요청을 처리하기 위해 필요
app.use(express.static(__dirname + '/public'));

const url = 'mongodb+srv://hjw1191:zxc123@hjw1191.zaqklsn.mongodb.net/?retryWrites=true&w=majority&appName=hjw1191'; 
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  serverSelectionTimeoutMS: 5000, // 서버 선택 타임아웃 5초
  socketTimeoutMS: 45000, // 소켓 타임아웃 45초
});

client.connect()
  .then(() => {
    console.log('DB 연결 성공');
    const db = client.db('forum');
    const linkCollection = db.collection('link');

    app.get('/api/dramas', async (req, res) => {
      try {
        const dramas = await linkCollection.find().toArray();
        res.json(dramas);
      } catch (err) {
        console.error('DB 조회 중 오류 발생:', err);
        res.status(500).send('DB 조회 중 오류 발생');
      }
    });

    app.get('/api/dramas/:id', async (req, res) => {
      try {
        const dramaId = req.params.id;
        if (!ObjectId.isValid(dramaId)) {
          return res.status(400).send('잘못된 드라마 ID 형식입니다.');
        }

        const drama = await linkCollection.findOne({ _id: new ObjectId(dramaId) });
        if (drama) {
          res.json(drama);
        } else {
          res.status(404).send('드라마를 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('DB 조회 중 오류 발생:', err);
        res.status(500).send('DB 조회 중 오류 발생');
      }
    });

    app.listen(8080, () => {
      console.log('http://localhost:8080 에서 서버 실행 중');
    });
  })
  .catch((err) => {
    console.error('DB 연결 실패:', err);
  });
