'use strict';

/*
  Chức năng:
  1. Dark / Light Mode
  2. Menu điện thoại
  3. Lọc dự án
  4. Modal chi tiết dự án
  5. Kiểm tra Form liên hệ
  6. Hiệu ứng khi cuộn trang
*/

(function () {
    function initPortfolio() {

        const body = document.body;

        const $ = function (selector, parent) {
            return (parent || document).querySelector(selector);
        };

        const $$ = function (selector, parent) {
            return Array.from(
                (parent || document).querySelectorAll(selector)
            );
        };

        // HIỂN THỊ THÔNG BÁO
        const toast = $('#toast');
        let toastTimer = null;

        function showToast(message) {
            if (!toast) return;

            toast.textContent = message;
            toast.classList.add('show');

            if (toastTimer !== null) {
                window.clearTimeout(toastTimer);
            }

            toastTimer = window.setTimeout(function () {
                toast.classList.remove('show');
            }, 3500);
        }

        // 1. DARK MODE / LIGHT MODE

        const themeToggle = $('.theme-toggle');
        const themeIcon = $('.theme-icon');

        function setTheme(isLight) {

            body.classList.toggle('light-theme', isLight);

            if (themeIcon) {
                themeIcon.textContent = isLight ? '☀' : '☾';
            }

            if (themeToggle) {
                themeToggle.setAttribute(
                    'aria-label',
                    isLight
                        ? 'Chuyển sang giao diện tối'
                        : 'Chuyển sang giao diện sáng'
                );
            }
        }

        let savedTheme = 'dark';

        try {
            savedTheme =
                localStorage.getItem('portfolio-theme') || 'dark';
        } catch (error) {

        }

        setTheme(savedTheme === 'light');

        if (themeToggle) {

            themeToggle.addEventListener('click', function () {

                const useLightTheme =
                    !body.classList.contains('light-theme');

                setTheme(useLightTheme);

                try {
                    localStorage.setItem(
                        'portfolio-theme',
                        useLightTheme ? 'light' : 'dark'
                    );
                } catch (error) {
                }

            });
        }


        // 2. MENU ĐIỀU HƯỚNG ĐIỆN THOẠI

        const menuToggle = $('.menu-toggle');
        const navLinks = $('.nav-links');
        const navItems = $$('.nav-link');

        if (menuToggle && navLinks) {

            menuToggle.addEventListener('click', function () {

                const isOpen =
                    navLinks.classList.toggle('open');

                menuToggle.setAttribute(
                    'aria-expanded',
                    String(isOpen)
                );

                menuToggle.setAttribute(
                    'aria-label',
                    isOpen ? 'Đóng menu' : 'Mở menu'
                );

            });

            navItems.forEach(function (link) {

                link.addEventListener('click', function () {

                    navLinks.classList.remove('open');

                    menuToggle.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                    menuToggle.setAttribute(
                        'aria-label',
                        'Mở menu'
                    );

                });

            });
        }


        // 3. LỌC DỰ ÁN

        const filterButtons = $$('.filter-button');
        const projectCards = $$('.project-card');

        filterButtons.forEach(function (button) {

            button.addEventListener('click', function () {

                const selectedFilter =
                    button.getAttribute('data-filter') || 'all';

                filterButtons.forEach(function (item) {
                    item.classList.remove('active');
                });

                button.classList.add('active');

                projectCards.forEach(function (card) {

                    const category =
                        card.getAttribute('data-category');

                    const shouldShow =
                        selectedFilter === 'all' ||
                        category === selectedFilter;

                    card.classList.toggle(
                        'is-hidden',
                        !shouldShow
                    );

                });

            });

        });


        // 4. CHI TIẾT DỰ ÁN - MODAL

        const projectDetails = {

            chat: {
                title: 'Ứng dụng Chat TCP bằng C#',

                description:
                    'Dự án nhóm xây dựng ứng dụng chat desktop ' +
                    'theo mô hình Server - Client. Ứng dụng sử dụng ' +
                    'TCP để truyền dữ liệu, WinForms để tạo giao diện ' +
                    'và JSON để biểu diễn nội dung tin nhắn. ' +
                    'Phần công việc cá nhân là Logging và báo cáo.',

                tags: [
                    'C#',
                    'WinForms',
                    'TCP',
                    'JSON',
                    'Logging'
                ],

            },

            portfolio: {
                title: 'Portfolio cá nhân',

                description:
                    'Website giới thiệu thông tin cá nhân, ' +
                    'mục tiêu nghề nghiệp, kỹ năng và các dự án học tập. ' +
                    'Website được xây dựng bằng HTML, CSS và JavaScript.',

                tags: [
                    'HTML5',
                    'CSS3',
                    'JavaScript',
                    'Responsive'
                ],

            }

        };


        const modal = $('#project-modal');
        const modalTitle = $('#modal-title');
        const modalDescription = $('#modal-description');
        const modalTags = $('#modal-tags');
        const modalNote = $('#modal-note');

        let lastFocusedElement = null;


        function closeProjectModal() {

            if (!modal) return;

            modal.classList.remove('open');

            modal.setAttribute('aria-hidden', 'true');

            body.style.overflow = '';

            if (
                lastFocusedElement &&
                typeof lastFocusedElement.focus === 'function'
            ) {
                lastFocusedElement.focus();
            }

        }


        function openProjectModal(projectKey, triggerElement) {

            const project = projectDetails[projectKey];

            if (
                !project ||
                !modal ||
                !modalTitle ||
                !modalDescription ||
                !modalTags ||
                !modalNote
            ) {
                return;
            }

            lastFocusedElement =
                triggerElement || document.activeElement;

            modalTitle.textContent = project.title;

            modalDescription.textContent =
                project.description;

            modalNote.textContent = project.note;

            modalTags.innerHTML = '';

            project.tags.forEach(function (tag) {

                const tagElement =
                    document.createElement('span');

                tagElement.textContent = tag;

                modalTags.appendChild(tagElement);

            });

            modal.classList.add('open');

            modal.setAttribute('aria-hidden', 'false');

            body.style.overflow = 'hidden';

            const closeButton =
                $('.modal-close', modal);

            if (closeButton) {
                closeButton.focus();
            }

        }


        // Nút xem chi tiết dự án.
        $$('.project-detail').forEach(function (button) {

            button.addEventListener('click', function () {

                openProjectModal(
                    button.getAttribute('data-project'),
                    button
                );

            });

        });


        // Nút đóng Modal.
        if (modal) {

            $$('[data-close-modal]', modal).forEach(
                function (element) {

                    element.addEventListener(
                        'click',
                        closeProjectModal
                    );

                }
            );

        }


        // Đóng Modal bằng phím ESC.
        document.addEventListener('keydown', function (event) {

            if (
                event.key === 'Escape' &&
                modal &&
                modal.classList.contains('open')
            ) {
                closeProjectModal();
            }

        });



        // 5. KIỂM TRA FORM LIÊN HỆ

        const contactForm = $('#contact-form');


        function showFieldError(
            input,
            errorElement,
            message
        ) {

            if (errorElement) {
                errorElement.textContent = message;
            }

            if (input) {

                input.classList.toggle(
                    'invalid',
                    Boolean(message)
                );

                input.setAttribute(
                    'aria-invalid',
                    String(Boolean(message))
                );

            }

        }


        if (contactForm) {

            contactForm.addEventListener(
                'submit',
                function (event) {

                    event.preventDefault();

                    const nameInput =
                        $('#full-name', contactForm);

                    const emailInput =
                        $('#email', contactForm);

                    const messageInput =
                        $('#message', contactForm);

                    const nameError =
                        $('#name-error', contactForm);

                    const emailError =
                        $('#email-error', contactForm);

                    const messageError =
                        $('#message-error', contactForm);

                    const formStatus =
                        $('#form-status', contactForm);


                    // Kiểm tra các trường nhập liệu.
                    if (
                        !nameInput ||
                        !emailInput ||
                        !messageInput
                    ) {

                        if (formStatus) {

                            formStatus.textContent =
                                'Form đang thiếu trường dữ liệu. ' +
                                'Vui lòng kiểm tra lại HTML.';

                            formStatus.className =
                                'form-status error';

                        }

                        return;
                    }


                    const name =
                        nameInput.value.trim();

                    const email =
                        emailInput.value.trim();

                    const message =
                        messageInput.value.trim();


                    // Kiểm tra định dạng Email.
                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


                    let isValid = true;


                    // Xóa lỗi cũ.
                    showFieldError(nameInput, nameError, '');

                    showFieldError(emailInput, emailError, '');

                    showFieldError(
                        messageInput,
                        messageError,
                        ''
                    );


                    // Kiểm tra họ tên.
                    if (name.length < 2) {

                        showFieldError(
                            nameInput,
                            nameError,
                            'Vui lòng nhập họ tên ít nhất 2 ký tự.'
                        );

                        isValid = false;

                    }


                    // Kiểm tra Email.
                    if (!emailPattern.test(email)) {

                        showFieldError(
                            emailInput,
                            emailError,
                            'Vui lòng nhập địa chỉ email hợp lệ.'
                        );

                        isValid = false;

                    }


                    // Kiểm tra nội dung.
                    if (message.length < 10) {

                        showFieldError(
                            messageInput,
                            messageError,
                            'Nội dung cần có ít nhất 10 ký tự.'
                        );

                        isValid = false;

                    }


                    if (formStatus) {

                        formStatus.className = 'form-status';

                        if (!isValid) {

                            formStatus.textContent =
                                'Bạn hãy kiểm tra lại các trường được đánh dấu.';

                            formStatus.classList.add('error');

                            return;

                        }

                        // Đây là form demo, chưa gửi dữ liệu lên máy chủ.
                        formStatus.textContent =
                            'Thông tin hợp lệ! ' +
                            'Đây là bản demo nên dữ liệu chưa được gửi đi.';

                        formStatus.classList.add('success');

                    } else if (!isValid) {

                        return;

                    }


                    showToast(
                        'Kiểm tra thành công. ' 
                    );

                    contactForm.reset();

                }
            );

        }



        // 6. HIỆU ỨNG XUẤT HIỆN KHI CUỘN TRANG

        const revealElements = $$('.reveal');


        if ('IntersectionObserver' in window) {

            const revealObserver =
                new IntersectionObserver(
                    function (entries, observer) {

                        entries.forEach(function (entry) {

                            if (entry.isIntersecting) {

                                entry.target.classList.add(
                                    'visible'
                                );

                                observer.unobserve(entry.target);

                            }

                        });

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealElements.forEach(function (element) {

                revealObserver.observe(element);

            });

        } else {

            revealElements.forEach(function (element) {

                element.classList.add('visible');

            });

        }



        // 7. CẬP NHẬT MENU KHI CUỘN TRANG

        const pageSections = $$('main section[id]');


        if (
            'IntersectionObserver' in window &&
            navItems.length > 0
        ) {

            const sectionObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(function (entry) {

                            if (entry.isIntersecting) {

                                navItems.forEach(function (link) {

                                    const isActive =
                                        link.getAttribute('href') ===
                                        '#' + entry.target.id;

                                    link.classList.toggle(
                                        'active',
                                        isActive
                                    );

                                });

                            }

                        });

                    },
                    {
                        rootMargin: '-35% 0px -55% 0px'
                    }
                );


            pageSections.forEach(function (section) {

                sectionObserver.observe(section);

            });

        }



        // 8. TỰ ĐỘNG CẬP NHẬT NĂM Ở FOOTER

        const yearElement = $('#year');

        if (yearElement) {

            yearElement.textContent =
                new Date().getFullYear();

        }

    }

    if (document.readyState === 'loading') {

        document.addEventListener(
            'DOMContentLoaded',
            initPortfolio
        );

    } else {

        initPortfolio();

    }

})();