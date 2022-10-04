<script>
    import {onMount, createEventDispatcher} from "svelte";
    let dispatch = createEventDispatcher();

    let canvas; let drawing = false; let context;
    let content;
    let current = {
        color: '#000000'
    }

    export const onDrawingEvent = data => {
        let w = canvas.width;
        let h = canvas.height;
        drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
        console.log('event received')
    }

    function onMouseDown(e){
        drawing = true;
        current.x = e.clientX||e.touches[0].clientX;
        current.y = e.clientY||e.touches[0].clientY;
    }

    function onMouseUp(e){
        if (!drawing) { return; }
        drawing = false;
        drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
    }

    function onMouseMove(e){
        if (!drawing) { return; }
        drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
        current.x = e.clientX||e.touches[0].clientX;
        current.y = e.clientY||e.touches[0].clientY;
    }

    function drawLine(x0, y0, x1, y1, color, emit){
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        if (!emit) { return; }
        let w = canvas.width;
        let h = canvas.height;

        dispatch('drawing', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
        });
    }

    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    onMount(() => {
        context = canvas.getContext('2d');
        window.addEventListener('resize', onResize, false);
        onResize();
    })

    function throttle(callback, delay) {
        let previousCall = new Date().getTime();
        return function() {
            let time = new Date().getTime();
            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

</script>

<canvas bind:this={canvas}
        on:mousedown={onMouseDown}
        on:touchstart={onMouseDown}
        on:mouseup={onMouseUp}
        on:touchend={onMouseUp}
        on:mouseout={onMouseUp}
        on:touchcancel={onMouseUp}
        on:mousemove={e=>throttle(onMouseMove(e), 10)}
        on:touchmove={e=>throttle(onMouseMove(e), 10)}
        on:resize={onResize}></canvas>

<input type="color" bind:value={current.color} aria-label="color" class="absolute">