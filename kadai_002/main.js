let untyped = '';
let typed = '';
let score = 0;
let typecount = 0;
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const count2 = document.getElementById('count2');
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
];
const createText = () => {
    typed = '';
    typedfield.textContent = typed;
    let random = Math.floor(Math.random() * textLists.length)
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};


// キー入力の判定
const keyPress2 = e => {
    // 誤タイプの場合
    if(e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }
    
    // 正タイプの場合
    score++;
    // 自身で作成　正解だった場合はインクリメントでカウントを1つ上げる
    typecount++;

    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;
    if(untyped==='') {
        createText();
    }
    // keyPress2が実行され、正解キーを押した場合にはカウントが1つ上がった変数(typecount)にcount2を書き換え、表示させる
    
    count2.textContent = typecount;
};

// タイピングスキルのランクを判定
const rankCheck = score => {
    let text = '';
    if(score < 100) {
        text = `あなたのランクはCです。\nBランクまで${100- score}文字です。`;
    } else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまで${200- score}文字です。`;
    } else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまで${300- score}文字です。`;
    } else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));
    if(result == true) {
        window.location.reload();
    }
};

// カウントダウンタイマー
const timer = () => {
    let time = count.textContent;
    const id =setInterval(() => {
        time--;
        count.textContent = time;
        if(time <= 0){
            gameOver(id);
            
        }
    },1000)
};

start.addEventListener('click',() => {
    setTimeout(() => {
        untypedfield.textContent = 'タイムアップ！';
        typedfield.style.display = 'none';
    },60000)
    

    timer();
    createText();
    start.style.display = 'none';
    document.addEventListener('keypress',keyPress2)
});
untypedfield.textContent = 'スタートボタンで開始';

// タイプ数をカウントする
const counter = () => {

}