"use client"
import React, { useState, useEffect } from 'react';
import styles from './CommentSection.module.css';
import { commentsAPI, CreateCommentDTO } from '@/lib/api/comments';
import { type Comment } from '@/types';

interface CommentSectionProps {
  initialComments?: Comment[];
  gameId?: string;
  achievementId?: string;
  isAchievementTutorial?: boolean;
}

export default function CommentSection({ initialComments = [], gameId, achievementId, isAchievementTutorial = false }: CommentSectionProps) {
  const [comments, setComments] = useState<CreateCommentDTO[]>(initialComments);
  const [commentText, setCommentText] = useState('');
  const [commentTitle, setCommentTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && commentTitle.trim() && (isAchievementTutorial ? achievementId : gameId)) {
      setIsSubmitting(true);
      try {
        const newComment: CreateCommentDTO = {
          ...(isAchievementTutorial ? {} : { gameId: gameId }),
          achievementId: achievementId,
          title: commentTitle,
          comment: commentText,
          createdAt: new Date().toISOString(),
          description: isAchievementTutorial ? 'Tutorial' : 'User review',
          genres: [],
          bewertung: rating
        };
        
        // Send to API
        await commentsAPI.create(newComment);
        
        // Update local state
        setComments([newComment, ...comments]);
        setCommentText('');
        setCommentTitle('');
        setRating(5);
      } catch (error) {
        console.error('Failed to create comment:', error);
        alert('Fehler beim Erstellen des Kommentars');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.commentSection}>
      <h2 className={styles.title}>{isAchievementTutorial ? 'Tutorials' : 'Kommentare'} ({comments.length})</h2>
      
      {/* Form to add comment */}
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <input
          type="text"
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
          placeholder={isAchievementTutorial ? 'Titel des Tutorials...' : 'Titel des Kommentars...'}
          className={styles.commentInput}
          style={{ marginBottom: '0.5rem' }}
        />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={isAchievementTutorial ? 'Schreibe ein Tutorial...' : 'Schreibe einen Kommentar...'}
          className={styles.commentInput}
          rows={4}
        />
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label>Bewertung: </label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ color: 'var(--text-main)', background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '4px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}/10</option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Wird gesendet...' : isAchievementTutorial ? 'Tutorial hinzufügen' : 'Kommentar hinzufügen'}
        </button>
      </form>
      
      {/* List of comments */}
      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>{isAchievementTutorial ? 'Noch keine Tutorials.' : 'Noch keine Kommentare.'}</p>
        ) : (
          comments.map((c, index) => (
            <div key={index} className={styles.comment}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: '0 0 0.25rem 0' }}>{c.title}</h3>
                <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{'⭐'.repeat(Math.round(c.bewertung))}</span>
              </div>
              <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{c.description}</p>
              <p style={{ margin: '0.5rem 0' }}>{c.comment}</p>
              <small style={{ color: 'var(--text-muted)' }}>{new Date(c.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
