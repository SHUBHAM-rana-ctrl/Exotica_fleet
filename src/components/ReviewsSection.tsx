import React, { useState } from 'react';
import { Review } from '../types';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [carName, setCarName] = useState('Lamborghini Huracán EVO');
  const [city, setCity] = useState('Mumbai');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      carId: 'lamborghini-huracan',
      carName,
      customerName: authorName,
      customerCity: city,
      customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating,
      date: 'Just now',
      comment,
      verifiedRental: true
    };

    onAddReview(newRev);
    setAuthorName('');
    setComment('');
    setModalOpen(false);
  };

  return (
    <section id="reviews" className="py-24 bg-[#08090C] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Client Testimonials
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              STORIES FROM THE COCKPIT.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Every drive is an indelible memory. Read verified experiences from international executives, collectors, and automotive purists.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-black bg-white/5 hover:bg-[#D4AF37] border border-white/10 hover:border-[#D4AF37] rounded-md transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#D4AF37]" />
            <span>Submit Your Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                
                {/* Top: Stars and Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-[#D4AF37] text-[#D4AF37]'
                            : 'text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>

                  {rev.verifiedRental && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Verified Renter
                    </span>
                  )}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Vehicle Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.customerAvatar}
                    alt={rev.customerName}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      {rev.customerName}
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      {rev.customerCity}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-neutral-500 block">Rented</span>
                  <span className="text-xs text-[#D4AF37] font-medium truncate max-w-[120px] block">
                    {rev.carName}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0E1016] border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-luxury text-lg font-bold text-white">Share Your Experience</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-[#141720] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Car Rented</label>
                  <input
                    type="text"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    className="w-full bg-[#141720] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Your City / Location</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#141720] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      className={`p-2 rounded-lg border transition-colors ${
                        rating >= s ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 text-neutral-500'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Review Comments</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe vehicle condition, delivery punctuality, and overall driving feel..."
                  className="w-full bg-[#141720] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md font-semibold"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
