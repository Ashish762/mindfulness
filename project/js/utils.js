export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function preventClose(e) {
    e.preventDefault();
    e.returnValue = '';
    return 'Are you sure you want to leave? Your meditation session is not complete.';
}