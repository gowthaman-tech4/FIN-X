'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  Headphones
} from 'lucide-react';

export default function AudioBriefPlayer({ stories = [], onStorySelect }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  // Take the top 5 essential stories for the audio brief
  const audioStories = stories.slice(0, 5);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speakStory = (index, rate = playbackRate) => {
    if (!synthRef.current || audioStories.length === 0) return;

    synthRef.current.cancel();

    const story = audioStories[index];
    if (!story) {
      setIsPlaying(false);
      return;
    }

    if (onStorySelect) {
      onStorySelect(story);
    }

    // Prepare clean speech text
    const textToSpeak = `Story ${index + 1} of ${audioStories.length}. From ${story.source_name}. ${story.headline}. ${story.summary.replace(/\n/g, ' ')}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = synthRef.current.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onend = () => {
      if (index + 1 < audioStories.length) {
        setCurrentIndex(index + 1);
        speakStory(index + 1, rate);
      } else {
        setIsPlaying(false);
        setCurrentIndex(0);
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      setIsPlaying(false);
    };

    synthRef.current.speak(utterance);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current.paused) {
        synthRef.current.resume();
        setIsPlaying(true);
      } else {
        speakStory(currentIndex);
      }
    }
  };

  const skipNext = () => {
    if (currentIndex + 1 < audioStories.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      if (isPlaying) {
        speakStory(nextIdx);
      }
    } else {
      setCurrentIndex(0);
      if (isPlaying) {
        speakStory(0);
      }
    }
  };

  const toggleRate = () => {
    const rates = [1.0, 1.25, 1.5];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (isPlaying) {
      speakStory(currentIndex, nextRate);
    }
  };

  const stopPlayback = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  if (!isSupported || audioStories.length === 0) return null;

  const currentStory = audioStories[currentIndex];

  return (
    <div className="audio-player-wrapper">
      <div className="player-inner">
        {/* Left Meta & Visualizer */}
        <div className="player-meta-group">
          <div className="audio-badge">
            <Headphones size={13} className="headphone-icon" />
            <span>60s Audio Brief</span>
          </div>

          {/* Soundwave equalizer bars */}
          <div className="wave-bars">
            <span className={`bar bar-1 ${isPlaying ? 'active' : ''}`} />
            <span className={`bar bar-2 ${isPlaying ? 'active' : ''}`} />
            <span className={`bar bar-3 ${isPlaying ? 'active' : ''}`} />
            <span className={`bar bar-4 ${isPlaying ? 'active' : ''}`} />
            <span className={`bar bar-5 ${isPlaying ? 'active' : ''}`} />
          </div>

          <div className="story-meta">
            <span className="story-counter">
              Story {currentIndex + 1} of {audioStories.length}
            </span>
            <span className="story-snippet" title={currentStory?.headline}>
              {currentStory?.headline}
            </span>
          </div>
        </div>

        {/* Right Playback Controls */}
        <div className="player-controls">
          <button 
            onClick={togglePlay} 
            className="play-main-btn"
            title={isPlaying ? 'Pause audio brief' : 'Listen to 60-second audio brief'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause' : 'Listen'}</span>
          </button>

          <button 
            onClick={skipNext} 
            className="ctrl-icon-btn" 
            title="Skip to next story"
          >
            <SkipForward size={14} />
          </button>

          <button 
            onClick={toggleRate} 
            className="rate-pill-btn" 
            title="Adjust reading speed"
          >
            {playbackRate}x
          </button>

          {isPlaying && (
            <button 
              onClick={stopPlayback} 
              className="ctrl-icon-btn stop-btn" 
              title="Stop audio"
            >
              <RotateCcw size={13} />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .audio-player-wrapper {
          background: #f8faf9;
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--brand-primary);
          border-radius: var(--radius);
          padding: 0.65rem 0.95rem;
          margin-top: 0.25rem;
        }

        .player-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .player-meta-group {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          min-width: 240px;
        }

        .audio-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #f0f7f3;
          color: var(--brand-primary);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          border: 1px solid #a8cfb8;
          letter-spacing: 0.02em;
        }

        .headphone-icon {
          color: var(--brand-primary);
        }

        /* Soundwave dancing equalizer */
        .wave-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 16px;
          padding: 0 2px;
        }

        .bar {
          width: 3px;
          height: 3px;
          background: #a2a9b1;
          border-radius: 0;
          transition: height 0.15s ease;
        }

        .bar.active {
          background: var(--brand-primary);
          animation: waveBounce 0.8s infinite ease-in-out;
        }

        .bar-1.active { animation-delay: 0.0s; }
        .bar-2.active { animation-delay: 0.2s; }
        .bar-3.active { animation-delay: 0.4s; }
        .bar-4.active { animation-delay: 0.1s; }
        .bar-5.active { animation-delay: 0.3s; }

        @keyframes waveBounce {
          0%, 100% { height: 3px; }
          50% { height: 14px; }
        }

        .story-meta {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          overflow: hidden;
        }

        .story-counter {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .story-snippet {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 280px;
        }

        .player-controls {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .play-main-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--brand-primary);
          color: #ffffff;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius);
          border: 1px solid #16382b;
          transition: all 0.15s ease;
        }

        .play-main-btn:hover {
          background: var(--brand-secondary);
          border-color: var(--brand-secondary);
        }

        .rate-pill-btn {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 0.3rem 0.55rem;
          border-radius: var(--radius-sm);
          transition: all 0.15s ease;
        }

        .rate-pill-btn:hover {
          background: #f8faf9;
          color: var(--text-primary);
          border-color: var(--brand-primary);
        }

        .ctrl-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
        }

        .ctrl-icon-btn:hover {
          color: var(--brand-primary);
          border-color: var(--brand-primary);
        }

        .stop-btn:hover {
          color: #ef4444;
          background: #fee2e2;
          border-color: #fca5a5;
        }

        @media (max-width: 640px) {
          .story-snippet {
            max-width: 180px;
          }
        }
      `}</style>
    </div>
  );
}
