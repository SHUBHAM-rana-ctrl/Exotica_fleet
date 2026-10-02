import { Booking } from '../types';
import { getDriveAccessToken } from './googleDriveAuth';

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  modifiedTime: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
}

const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_BASE = 'https://www.googleapis.com/upload/drive/v3';

export class GoogleDriveService {
  /**
   * Helper to execute authorized Drive API requests
   */
  private static async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = await getDriveAccessToken();
    if (!token) {
      throw new Error('Google Drive access token not found. Please sign in with Google.');
    }

    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${token}`);

    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error?.message || `Google Drive API error: ${res.status} ${res.statusText}`);
    }
    return res;
  }

  /**
   * Locate or create the dedicated 'EXOTICA Luxury Rentals' folder in user's Drive
   */
  static async getOrCreateExoticaFolder(): Promise<string> {
    const folderName = 'EXOTICA Luxury Rentals';
    const query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
    
    const searchRes = await this.fetchWithAuth(
      `${DRIVE_API_BASE}/files?q=${encodeURIComponent(query)}&fields=files(id,name)&spaces=drive`
    );
    const searchData = await searchRes.json();

    if (searchData.files && searchData.files.length > 0) {
      return searchData.files[0].id;
    }

    // Create folder
    const createRes = await this.fetchWithAuth(`${DRIVE_API_BASE}/files`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        description: 'Official EXOTICA luxury car rental vouchers, contracts, and fleet receipts.'
      }),
    });
    const folderData = await createRes.json();
    return folderData.id;
  }

  /**
   * List files created in or related to EXOTICA
   */
  static async listRentalFiles(): Promise<DriveFileItem[]> {
    try {
      const query = `name contains 'EXOTICA' and trashed = false`;
      const res = await this.fetchWithAuth(
        `${DRIVE_API_BASE}/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,createdTime,modifiedTime,size,webViewLink,iconLink)&orderBy=createdTime desc&pageSize=30`
      );
      const data = await res.json();
      return data.files || [];
    } catch (err) {
      console.error('Failed to list files from Google Drive:', err);
      throw err;
    }
  }

  /**
   * Save an official Booking Voucher to Google Drive as an elegant HTML document
   */
  static async saveBookingToDrive(booking: Booking): Promise<DriveFileItem> {
    const folderId = await this.getOrCreateExoticaFolder();

    const fileName = `EXOTICA_Reservation_${booking.bookingReference}_${booking.brandName}_${booking.pickupDate}.html`;

    const fileContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EXOTICA Luxury Reservation Voucher - ${booking.bookingReference}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #08090C; color: #F3F4F6; padding: 40px; }
    .card { max-width: 680px; margin: 0 auto; background: #12141A; border: 1px solid #D4AF37; border-radius: 12px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
    .header { text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 24px; }
    .gold { color: #D4AF37; }
    .title { font-size: 28px; font-weight: bold; letter-spacing: 2px; margin: 0; }
    .ref { font-family: monospace; font-size: 16px; background: rgba(212,175,55,0.15); padding: 4px 12px; border-radius: 4px; display: inline-block; margin-top: 8px; border: 1px solid rgba(212,175,55,0.3); }
    .section { margin-top: 24px; padding: 16px; background: #0A0C11; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
    .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
    .total-row { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-top: 12px; font-size: 18px; font-weight: bold; }
    .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #888; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 class="title gold">EXOTICA</h1>
      <p style="margin: 4px 0 0 0; font-size: 12px; letter-spacing: 1px; color: #aaa;">DRIVE BEYOND ORDINARY · OFFICIAL CHARTER VOUCHER</p>
      <div class="ref gold">BOOKING REF: ${booking.bookingReference}</div>
    </div>

    <div class="section">
      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #D4AF37;">VEHICLE SPECIFICATION</h3>
      <div class="row"><span>Vehicle:</span><strong>${booking.carName}</strong></div>
      <div class="row"><span>Charter Type:</span><span>${booking.chauffeurOption ? 'Professional Chauffeur Assigned' : 'Self-Drive Experience'}</span></div>
      <div class="row"><span>Duration:</span><span>${booking.durationDays} Days</span></div>
    </div>

    <div class="section">
      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #D4AF37;">ITINERARY & DISPATCH</h3>
      <div class="row"><span>Pick-up Date & Time:</span><span>${booking.pickupDate} at ${booking.pickupTime}</span></div>
      <div class="row"><span>Pick-up Hub:</span><span>${booking.pickupLocation}</span></div>
      <div class="row"><span>Return Date:</span><span>${booking.returnDate}</span></div>
      <div class="row"><span>Return Hub:</span><span>${booking.dropoffLocation}</span></div>
    </div>

    <div class="section">
      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #D4AF37;">GUEST & VERIFICATION</h3>
      <div class="row"><span>Primary Passenger:</span><span>${booking.customerName}</span></div>
      <div class="row"><span>Contact:</span><span>${booking.customerEmail} · ${booking.customerPhone}</span></div>
      <div class="row"><span>Driver License:</span><code>${booking.driverLicenseNumber}</code></div>
    </div>

    <div class="section">
      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #D4AF37;">FINANCIAL STATEMENT</h3>
      <div class="row"><span>Fleet Base Rate:</span><span>$${booking.baseRentalTotal.toLocaleString()}</span></div>
      ${booking.chauffeurTotal > 0 ? `<div class="row"><span>Chauffeur Service:</span><span>+$${booking.chauffeurTotal.toLocaleString()}</span></div>` : ''}
      ${booking.servicesTotal > 0 ? `<div class="row"><span>Concierge Services:</span><span>+$${booking.servicesTotal.toLocaleString()}</span></div>` : ''}
      <div class="row"><span>Refundable Security Deposit:</span><span>$${booking.securityDeposit.toLocaleString()}</span></div>
      <div class="row"><span>Tax & Comprehensive Insurance:</span><span>$${booking.luxuryTaxAndInsurance.toLocaleString()}</span></div>
      <div class="row total-row"><span class="gold">Grand Total:</span><span class="gold">$${booking.grandTotal.toLocaleString()} USD</span></div>
    </div>

    <div class="footer">
      <p>Thank you for choosing EXOTICA. 24/7 International Concierge: +971 4 812 6000</p>
      <p>© ${new Date().getFullYear()} EXOTICA Luxury Mobility Corporation.</p>
    </div>
  </div>
</body>
</html>`;

    // Multipart upload to Google Drive v3
    const metadata = {
      name: fileName,
      mimeType: 'text/html',
      parents: [folderId],
      description: `Official EXOTICA Luxury Rental Voucher for ${booking.carName} (Ref #${booking.bookingReference}).`
    };

    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: text/html\r\n\r\n' +
      fileContent +
      closeDelimiter;

    const res = await this.fetchWithAuth(
      `${DRIVE_UPLOAD_BASE}/files?uploadType=multipart&fields=id,name,mimeType,createdTime,modifiedTime,size,webViewLink`,
      {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      }
    );

    const uploaded = await res.json();
    return uploaded;
  }

  /**
   * Delete a file from Google Drive (MUST be called after user confirmation)
   */
  static async deleteDriveFile(fileId: string): Promise<void> {
    await this.fetchWithAuth(`${DRIVE_API_BASE}/files/${fileId}`, {
      method: 'DELETE',
    });
  }
}
