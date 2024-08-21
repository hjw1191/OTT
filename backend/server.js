const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb'); // ObjectId 추가
const cors = require('cors');

app.use(cors()); // CORS 문제 해결
app.use(express.static(__dirname + '/public')); // 정적 파일 제공
app.set('view engine', 'ejs'); // 템플릿 엔진 설정

const url = 'mongodb+srv://hjw1191:zxc123@hjw1191.zaqklsn.mongodb.net/?retryWrites=true&w=majority&appName=hjw1191'; 
const client = new MongoClient(url);

client.connect()
  .then(() => {
    console.log('DB 연결 성공');
    const db = client.db('forum'); // forum 데이터베이스 연결
    const linkCollection = db.collection('link'); // link 컬렉션 연결

    // 전체 드라마 목록을 가져오는 엔드포인트
    app.get('/api/dramas', async (req, res) => {
      try {
        const dramas = await linkCollection.find().toArray();
        res.json(dramas); // 드라마 데이터를 JSON 형식으로 리턴
      } catch (err) {
        console.error('DB 조회 중 오류 발생:', err);
        res.status(500).send('DB 조회 중 오류 발생');
      }
    });

    // 특정 드라마 ID로 데이터를 가져오는 엔드포인트
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
