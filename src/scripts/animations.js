export function pressButton(button_element_id, scale= 0.97, initialScale = 1, duration= 1000) {
    let button = document.getElementById(button_element_id);
    button.style.transform = `scale(${scale})`;
    setTimeout(() => {
        button.style.transform = `scale(${initialScale})`;
    }, duration)
}