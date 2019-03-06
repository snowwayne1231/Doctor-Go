
<script>
    export default {
        render(h) {
            // debug('input-form-render', this);
            // this.$slots.default.map(slot => {
            //     slot.tag = 'li';
            // })
            return (
                <div class="input-form">
                    {this.$slots.default}
                </div>
            );
        },
        props: {
            'column': Object,
        },
        mounted() {
            // debug('input-form', this);
            // debug('input-form-column', this.column);
            this.$el.addEventListener('keypress', this.onKeypress);
            foreach(this.$el.querySelectorAll('input'), (input) => {
                this.switchTypingInput(input, () => {
                    input.addEventListener('focus', this.onFocus);
                    input.addEventListener('blur', this.onBlur);
                });
            });
            

            foreach(this.$el.children, (node, i) => {

                node.classList.add('input-form-row');

                const filtedChildren = foreach(node.children).filter(e => !!/div/i.test(e.tagName));
                
                const len = filtedChildren.length;

                const columnData = this.column[len];
                
                if (columnData) {

                    filtedChildren.map((subNode, si) => {
                        const loc = columnData[si];
                        if (loc) {
                            subNode.style.flex = loc;
                        }
                        subNode.classList.add('input-form-col');
                    });
                }
            });
        },
        methods: {
            switchTypingInput(input, callback) {
                switch (input.type) {
                    case 'checkbox':
                    case 'button':
                    case 'file':
                    case 'radio':
                        break;
                    default:
                        callback(input);
                }
            },
            onKeypress(evt) {
                switch (true) {
                    case evt.keyCode === 13:
                    case !!evt.key.match(/enter/i):
                        this.focusNextInput(evt);
                        break;
                    default:
                }
                // debug(evt);
            },
            focusNextInput(evt) {
                let gotta = false;
                let isFinal = true;
                const inputs = this.$el.querySelectorAll('input');
                const target = evt.target;
                target.blur();
                
                foreach(inputs, (input, i) => {
                    if (gotta) {
                        input.focus();
                        isFinal = false;
                        return 'break';
                    }
                    gotta = input === target;
                });
            },
            onFocus(evt) {
                this.$emit('focus', evt);
            },
            onBlur(evt) {
                this.$emit('blur', evt);
            },
        },
        destroyed() {
            this.$el.removeEventListener('keypress', this.onKeypress);
            foreach(this.$el.querySelectorAll('input'), (input) => {
                this.switchTypingInput(input, () => {
                    input.removeEventListener('focus', this.onFocus);
                    input.removeEventListener('blur', this.onBlur);
                });
            });
        },
    };
</script>

