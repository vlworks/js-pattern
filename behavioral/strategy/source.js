export function inputMaskHandler() {
    document.addEventListener('click', (e) => {
        if (e.target.tagName === "INPUT") {
            const node = e.target;
            if (node.hasAttribute('data-mask-phone') && node.dataset.maskPhone.trim()) {
                const regRaw = node.dataset.maskPhone;
                const reg = regRaw.slice(1, regRaw.length - 1);
                Inputmask({regex: reg}).mask(node);
            }
        }
    })
}
