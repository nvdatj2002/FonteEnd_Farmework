import { Container } from "react-bootstrap"
import './css/footer.scss'
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="footer-top-content">
                    <ul>
                        <i className="fa-solid fa-plane footer-icon"></i>
                        THANH TOÁN & GIAO HÀNG
                        <li>
                            - Giao hàng và thu tiền tận nơi
                        </li>
                        <li>
                            - Chuyển khoản và giao hàng
                        </li>
                        <li>
                            - Mua hàng tại shop
                        </li>
                    </ul>
                </div>
                <div className="footer-top-content">
                    <ul>
                        <i className="fa-solid fa-money-check footer-icon"></i>
                        THẺ THÀNH VIÊN
                        <li>
                            Chế độ ưu đãi thành viên VIP:
                        </li>
                        <li>
                            - 5% cho thành viên Bạc
                        </li>
                        <li>
                            - 10% cho thành viên Vàng
                        </li>
                        <li>
                            - 15% cho thành viên Kim cương
                        </li>
                    </ul>
                </div>
                <div className="footer-top-content">
                    <ul>
                        <i className="fa-solid fa-clock footer-icon"></i>
                        GIỜ MỞ CỬA
                        <li>
                            <strong>8h30 đến 22:00</strong>
                        </li>
                        <li>
                            - Tất cả các ngày trong tuần
                        </li>
                        <li>
                            - Áp dụng cho tất cả các chi nhánh hệ thống cửa hàng 4MEN
                        </li>
                    </ul>
                </div>
                <div className="footer-top-content">
                    <ul>
                        <i className="fa-solid fa-headphones footer-icon"></i>
                        HỖ TRỢ 24/7
                        <li>
                            Gọi ngay cho chúng tôi khi bạn có thắc mắc
                            - 0793705739
                        </li>

                    </ul>
                </div>

            </div>
            <div className="footer-center">

            </div>
        </div>
    )
}
export default Footer