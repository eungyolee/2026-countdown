import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Fireworks } from '@fireworks-js/react';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [isRunning, setIsRunning] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const ref = useRef(null);

  const TARGET_DATE = "2026-01-01 00:00:00";
  const CLOCK_TITLE = "2026년 카운트다운";

  const checkRunning = () => new Date(TARGET_DATE) - new Date() > 0;

  const calculateTimeLeft = () => {
    const difference = new Date(TARGET_DATE) - new Date();
    return difference > 0
      ? {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        milliseconds: Math.floor((difference % 1000) / 10),
      }
      : {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
  };

  const copyTime = () => {
    const text = !isRunning
      ? `2026년 새해가 밝았습니다!`
      : `현재 ${TARGET_DATE.split(' ')[0].replaceAll('-', '. ')}까지 ${timeLeft.days}일 ${timeLeft.hours}시간 ${timeLeft.minutes}분 ${timeLeft.seconds}초 남았습니다.`;
    navigator.clipboard.writeText(text);
    alert('시간이 복사되었습니다.');
  };

  const easteregg = () => {
    console.log("AnA에 영광을");
    console.log("GLORY TO AnA");
    console.log("https://sunrint-ana.dev");
  };

  const setFireworks = () => {
    if (!ref.current) return;
    isRunning ? ref.current.stop() : ref.current.start();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setIsRunning(checkRunning());
      setYear(new Date().getFullYear());
    }, 10);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setFireworks();
  }, [isRunning]);

  return (
    <>
      <div className="clock-container">
        <h1 className="clock-title" onClick={easteregg}>{CLOCK_TITLE}</h1>
        <div className="clock">
          <span>{String(timeLeft.days).padStart(2, '0')}</span>
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span>{String(timeLeft.milliseconds).padStart(2, '0')}</span>
        </div>
        <div className="clock-label">
          <span>일</span>
          <span>시간</span>
          <span>분</span>
          <span>초</span>
          <span>밀리초</span>
        </div>
        {!isRunning && <h2>Happy New Year 2026!</h2>}
        <button onClick={copyTime}>시간 복사하기</button>
      </div>
      <p className="copyright">
        모두가 2025년 카운트다운을 만들 때 나는 2026년 카운트다운을 만든다.<br />
        Copyright 2024 - {year}. {' '}
        <a href="https://eungyolee.kr" target="_blank" rel="noreferrer">EUNGYOLEE</a> All rights reserved.
      </p>
      <Fireworks
        ref={ref}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
        }}
        colors={['#cc3333', '#4CAF50', '#81C784', '#FFD700', '#FF69B4', '#00BFFF']}
        count={3}
        interval={1000}
        height={600}
      />
    </>
  );
}

export default App;
