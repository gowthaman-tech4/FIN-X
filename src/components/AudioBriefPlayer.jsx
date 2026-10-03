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
    <div className={`audio-player-card ${isPlaying ? 'playing' : ''}`}>
      <div className="player-inner">
        {/* Left: Animated Soundwave Icon & Status */}
        <div className="player-left">
          <div className="audio-badge">
            <Headphones size={15} className="headphone-icon" />
            <span className="badge-text">60-Sec Audio Brief</span>
          </div>

          <div className="wave-bars" title={isPlaying ? "Speaking..." : "Audio Ready"}>
            <span className={`bar bar-1 ${isPlaying ? 'active' : ''}`} />
            <span className={`bar bar-2 ${isPlaying ? 'active' : ''}`} />
            <span className={`bar bar-3 ${isPlaying ? 'active' : ''}`} />
            <span className={`bar bar-4 ${isPlaying ? 'active' : ''}`} />
            <span className={`bar bar-5 ${isPlaying ? 'active' : ''}`} />
          </div>

          <div className="story-meta">
            <span className="story-counter">
              Brief {currentIndex + 1} of {audioStories.length}
            </span>
            <span className="story-snippet" title={currentStory?.headline}>
              {currentStory?.headline?.slice(0, 48)}...
            </span>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="player-controls">
          <button 
            onClick={toggleRate} 
            className="rate-pill-btn"
            title="Change narration speed"
          >
            {playbackRate}×
          </button>

          <button 
            onClick={togglePlay} 
            className="play-main-btn"
            title={isPlaying ? "Pause Brief" : "Listen to Today's Brief (60s)"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
            <span className="btn-label">{isPlaying ? 'Pause' : 'Listen'}</span>
          </button>

          <button 
            onClick={skipNext} 
            className="ctrl-icon-btn"
            title="Next story"
          >
            <SkipForward size={15} />
          </button>

          {isPlaying && (
            <button 
              onClick={stopPlayback} 
              className="ctrl-icon-btn stop-btn"
              title="Stop playback"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .audio-player-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          padding: 0.65rem 1rem;
          box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 0.75rem;
        }

        .audio-player-card.playing {
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 8px 24px -4px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.2);
          background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
        }

        .player-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .player-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 240px;
        }

        .audio-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%);
          color: #2563eb;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          border: 1px solid rgba(59, 130, 246, 0.25);
          letter-spacing: 0.02em;
        }

        .headphone-icon {
          color: #2563eb;
        }

        /* Soundwave dancing equalizer */
        .wave-bars {
          display: flex;
          align-items: flex-end;
          gap: 2.5px;
          height: 18px;
          padding: 0 2px;
        }

        .bar {
          width: 3px;
          height: 4px;
          background: #94a3b8;
          border-radius: 9999px;
          transition: height 0.15s ease, background 0.2s ease;
        }

        .bar.active {
          background: #2563eb;
          animation: waveBounce 0.8s infinite ease-in-out;
        }

        .bar-1.active { animation-delay: 0.0s; }
        .bar-2.active { animation-delay: 0.2s; }
        .bar-3.active { animation-delay: 0.4s; }
        .bar-4.active { animation-delay: 0.1s; }
        .bar-5.active { animation-delay: 0.3s; }

        @keyframes waveBounce {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }

        .story-meta {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          overflow: hidden;
        }

        .story-counter {
          font-size: 0.68rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .story-snippet {
          font-size: 0.78rem;
          font-weight: 600;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 280px;
        }

        .player-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .play-main-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
          transition: all 0.18s ease;
        }

        .play-main-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
        }

        .rate-pill-btn {
          font-size: 0.72rem;
          font-weight: 700;
          color: #475569;
          background: rgba(241, 245, 249, 0.9);
          border: 1px solid rgba(203, 213, 225, 0.8);
          padding: 0.32rem 0.6rem;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .rate-pill-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .ctrl-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          color: #64748b;
          background: rgba(241, 245, 249, 0.9);
          border: 1px solid rgba(203, 213, 225, 0.8);
          transition: all 0.15s ease;
        }

        .ctrl-icon-btn:hover {
          color: #0f172a;
          background: #e2e8f0;
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
