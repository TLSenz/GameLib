"use client"
import React, { useState, useEffect } from 'react';
import styles from './CommentSection.module.css';
import { commentsAPI, type Comment } from '@/lib/api/comments';

interface CommentSectionProps {
  initialComments?: Comment[];
  steamAppId?: number;
}

export default function CommentSection({ initialComments = [], steamAppId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState('');
  const [commentTitle, setCommentTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && commentTitle.trim() && steamAppId) {
      setIsSubmitting(true);
      try {
        const newComment: Comment = {
          steamAppId,
          title: commentTitle,
          comment: commentText,
          created_at: new Date().toISOString(),
          description: 'User review',
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
      <h2 className={styles.title}>Kommentare ({comments.length})</h2>
      
      {/* Form to add comment */}
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <input
          type="text"
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
          placeholder="Titel des Kommentars..."
          className={styles.commentInput}
          style={{ marginBottom: '0.5rem' }}
        />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Schreibe einen Kommentar..."
          className={styles.commentInput}
          rows={4}
        />
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label>Bewertung: </label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ padding: '0.5rem', borderRadius: '4px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}/10</option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Wird gesendet...' : 'Kommentar hinzufügen'}
        </button>
      </form>
      
      {/* List of comments */}
      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>Noch keine Kommentare.</p>
        ) : (
          comments.map((c, index) => (
            <div key={index} className={styles.comment}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: '0 0 0.25rem 0' }}>{c.title}</h3>
                <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{'⭐'.repeat(Math.round(c.bewertung))}</span>
              </div>
              <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{c.description}</p>
              <p style={{ margin: '0.5rem 0' }}>{c.comment}</p>
              <small style={{ color: 'var(--text-muted)' }}>{new Date(c.created_at).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
