import { useRef } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificatePage() {
    const { getOverallProgress } = useProgress();
    const certRef = useRef();
    const progress = getOverallProgress();

    const downloadCertificate = async () => {
        const canvas = await html2canvas(certRef.current, {
            scale: 2,
            backgroundColor: '#0a0a0a'
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, (pdf.internal.pageSize.getHeight() - pdfHeight) / 2, pdfWidth, pdfHeight);
        pdf.save('DataMatrix_Academy_Certificate.pdf');
    };

    if (progress < 100) {
        return (
            <div className="certificate-locked">
                <div className="lock-icon-huge">🔒</div>
                <h1>Сертификат заблокирован</h1>
                <p>Заверши все 9 модулей, чтобы получить диплом Data Sensei.</p>
                <div className="cert-progress-bar">
                    <div className="cert-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <Link to="/" className="btn btn-primary">Вернуться к обучению</Link>
            </div>
        );
    }

    return (
        <div className="certificate-page">
            <h1 className="page-title">🏆 Твой Сертификат</h1>
            <p className="page-subtitle">Ты прошел весь путь. Теперь ты — часть матрицы данных.</p>

            <div className="certificate-container" ref={certRef}>
                <div className="cert-border">
                    <div className="cert-content">
                        <div className="cert-header">
                            <span className="cert-logo">DATAMATRIX ACADEMY</span>
                            <div className="cert-badge">DS SENSEI</div>
                        </div>

                        <h2 className="cert-title">CERTIFICATE OF COMPLETION</h2>
                        <p className="cert-text">This is to certify that</p>
                        <h3 className="cert-name">FUTURE DATA SCIENTIST</h3>
                        <p className="cert-text">has successfully mastered the secrets of Data Science,</p>
                        <p className="cert-desc">including Python, Statistics, EDA, and Machine Learning.</p>

                        <div className="cert-footer">
                            <div className="cert-id">Verification ID: DM-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                            <div className="cert-date">{new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cert-actions">
                <button className="btn btn-gold btn-lg" onClick={downloadCertificate}>
                    📥 Скачать PDF
                </button>
                <Link to="/" className="btn btn-secondary">На главную</Link>
            </div>
        </div>
    );
}
