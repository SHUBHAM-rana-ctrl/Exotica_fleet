import React, { useState, useEffect } from 'react';
import { Booking } from '../types';
import { 
  X, HardDrive, RefreshCw, Upload, ExternalLink, Trash2, 
  CheckCircle2, AlertCircle, FileText, Folder, Shield, LogOut 
} from 'lucide-react';
import { 
  initDriveAuth, 
  signInWithGoogleDrive, 
  logoutDrive, 
  getDriveAccessToken, 
  SCOPES 
} from '../services/googleDriveAuth';
import { GoogleDriveService, DriveFileItem } from '../services/googleDrive';
import { User as FirebaseUser } from 'firebase/auth';

interface GoogleDriveModalProps {
  isOpen: boolean;
  bookings: Booking[];
  onClose: () => void;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  bookings,
  onClose,
}) => {
  if (!isOpen) return null;

  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [syncingAll, setSyncingAll] = useState(false);

  // Destructive delete confirmation dialog state
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initDriveAuth(
      (user, tok) => {
        setGoogleUser(user);
        setToken(tok);
        loadFiles();
      },
      () => {
        setGoogleUser(null);
        setToken(null);
        setFiles([]);
      }
    );

    // Initial token check
    getDriveAccessToken().then((t) => {
      if (t) {
        setToken(t);
        loadFiles();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setStatusMsg(null);
    try {
      const res = await signInWithGoogleDrive();
      if (res) {
        setGoogleUser(res.user);
        setToken(res.accessToken);
        setStatusMsg({ type: 'success', text: `Connected as ${res.user.email}` });
        await loadFiles();
      }
    } catch (err: any) {
      console.error('Google Drive sign in failed:', err);
      setStatusMsg({ type: 'error', text: err.message || 'Authentication was cancelled or failed.' });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logoutDrive();
    setGoogleUser(null);
    setToken(null);
    setFiles([]);
    setStatusMsg({ type: 'success', text: 'Disconnected from Google Drive.' });
  };

  const loadFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const driveFiles = await GoogleDriveService.listRentalFiles();
      setFiles(driveFiles);
    } catch (err: any) {
      console.error('Failed to load drive files:', err);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleSyncAllBookings = async () => {
    if (!token) return;
    setSyncingAll(true);
    setStatusMsg(null);
    try {
      let count = 0;
      for (const booking of bookings) {
        await GoogleDriveService.saveBookingToDrive(booking);
        count++;
      }
      setStatusMsg({ 
        type: 'success', 
        text: `Successfully exported ${count} reservation vouchers to your 'EXOTICA Luxury Rentals' Google Drive folder.` 
      });
      await loadFiles();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: `Sync failed: ${err.message}` });
    } finally {
      setSyncingAll(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    setStatusMsg(null);
    try {
      await GoogleDriveService.deleteDriveFile(fileToDelete.id);
      setStatusMsg({ type: 'success', text: `Deleted "${fileToDelete.name}" from Google Drive.` });
      setFileToDelete(null);
      await loadFiles();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: `Delete failed: ${err.message}` });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0D0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08090C]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37]">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-luxury text-base font-bold text-white">Google Drive Fleet Sync</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold uppercase tracking-wider">
                  Official Workspace Integration
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Securely store, organize, and export your luxury rental agreements & vouchers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* Status Alert */}
          {statusMsg && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center justify-between gap-3 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                  : 'bg-red-950/60 border border-red-500/40 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {statusMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{statusMsg.text}</span>
              </div>
              <button onClick={() => setStatusMsg(null)} className="text-neutral-400 hover:text-white text-xs">
                Dismiss
              </button>
            </div>
          )}

          {/* Connection Status Card */}
          <div className="bg-[#12141A] rounded-xl p-5 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {token && googleUser ? (
              <div className="flex items-center gap-3">
                {googleUser.photoURL ? (
                  <img
                    src={googleUser.photoURL}
                    alt={googleUser.displayName || 'Google Account'}
                    className="w-12 h-12 rounded-full border border-white/20 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center font-bold text-[#D4AF37]">
                    G
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-luxury">
                      {googleUser.displayName || 'Google Account Connected'}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      Active Session
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">{googleUser.email}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    Sync Destination: <strong className="text-neutral-300">My Drive / EXOTICA Luxury Rentals</strong>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-luxury">Connect Your Google Account</h4>
                <p className="text-xs text-neutral-400 max-w-md">
                  Authorize EXOTICA with your permission to create an <em>EXOTICA Luxury Rentals</em> folder in your Drive to automatically save reservation vouchers, damage-waiver agreements, and invoices.
                </p>
              </div>
            )}

            <div>
              {token && googleUser ? (
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-md transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              ) : (
                <button
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-white text-neutral-900 hover:bg-neutral-100 font-medium text-xs shadow-md transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>{isSigningIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Drive Actions Bar */}
          {token && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSyncAllBookings}
                  disabled={syncingAll}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{syncingAll ? 'Exporting Vouchers...' : `Export All Bookings (${bookings.length})`}</span>
                </button>

                <button
                  onClick={loadFiles}
                  disabled={isLoadingFiles}
                  title="Refresh files"
                  className="p-2 text-neutral-400 hover:text-white bg-[#12141A] border border-white/10 rounded-md transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="text-xs text-neutral-400">
                Found <strong className="text-white tabular-nums">{files.length}</strong> EXOTICA files in Google Drive
              </div>
            </div>
          )}

          {/* Files List in Drive */}
          {token ? (
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Saved Rental Documents & Vouchers
              </h4>

              {isLoadingFiles ? (
                <div className="p-8 text-center bg-[#12141A] rounded-xl border border-white/5 text-neutral-400 text-xs">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#D4AF37] mb-2" />
                  <span>Loading files from Google Drive...</span>
                </div>
              ) : files.length > 0 ? (
                <div className="bg-[#12141A] rounded-xl border border-white/5 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#0A0C11] text-neutral-400 border-b border-white/5">
                      <tr>
                        <th className="p-3">Document Name</th>
                        <th className="p-3">Created Date</th>
                        <th className="p-3">Type</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-300">
                      {files.map((file) => (
                        <tr key={file.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3 flex items-center gap-2.5">
                            <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
                            <span className="font-medium text-white truncate max-w-sm" title={file.name}>
                              {file.name}
                            </span>
                          </td>
                          <td className="p-3 text-neutral-400">
                            {new Date(file.createdTime).toLocaleDateString()}
                          </td>
                          <td className="p-3 text-neutral-500 font-mono text-[11px]">
                            {file.mimeType.split('/').pop()}
                          </td>
                          <td className="p-3 text-right">
                            <div className="inline-flex items-center gap-2">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open in Google Drive"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#D4AF37] hover:text-white bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded transition-colors"
                                >
                                  <span>Open in Drive</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              <button
                                onClick={() => setFileToDelete(file)}
                                title="Delete from Drive"
                                className="p-1 text-neutral-400 hover:text-red-400 hover:bg-white/5 rounded cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center bg-[#12141A] rounded-xl border border-white/5 text-neutral-400 text-xs space-y-2">
                  <Folder className="w-8 h-8 text-[#D4AF37]/40 mx-auto" />
                  <p>No EXOTICA files found in your Google Drive yet.</p>
                  <p className="text-[11px] text-neutral-500">
                    Click "Export All Bookings" above to generate official vouchers in your Drive.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#12141A] rounded-xl border border-white/5 space-y-3">
              <Shield className="w-10 h-10 text-[#D4AF37]/40 mx-auto" />
              <h4 className="font-luxury text-base font-bold text-white">Drive Access Requires One-Click Sign In</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Sign in with your Google account to enable automatic backup of your luxury car booking vouchers and driver credentials directly into your personal Google Drive.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#08090C] border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span>Protected by Google Workspace OAuth 2.0 with in-memory token security</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>

      {/* Mandatory User Confirmation Dialog for Destructive Delete (Per Skill Rules) */}
      {fileToDelete && (
        <div className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#0E1016] border border-red-500/30 rounded-xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-2 rounded-full bg-red-500/10 border border-red-500/30">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h4 className="font-luxury text-base font-bold text-white">Confirm File Deletion</h4>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-white">"{fileToDelete.name}"</strong> from your Google Drive? This action cannot be undone.
            </p>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setFileToDelete(null)}
                className="px-4 py-2 text-neutral-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md font-semibold cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete File'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
