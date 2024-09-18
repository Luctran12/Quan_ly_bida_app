<h1>Rule</h1>
<h2>CẤU TRÚC CHUNG CỦA 1 COMMIT MESSAGE:</h2>
<h3> <<type>type>: <<description>description></h3>
<h3>[body]</h3>
Trong đó:</br>
type và description là phần BẮT BUỘC</br>
body là phần TÙY CHỌN, có thể có hoặc không</br>
Ví dụ:</br>
feat: add email notifications on new messages</br>
refers to JIRA-1234</br>
  
<h3><<type>type></h3>
feat: Một tính năng mới (feature)</br>
fix: Sửa lỗi (fix bug)</br>
docs: Cập nhật tài liệu (sửa documents)</br>
style: Thêm khoảng trắng, format code, thiếu dấu chấm phảy, ...</br>
refactor: Đổi tên hàm, tên biến dễ hiểu hơn, tách hàm con, xóa code thừa, ...</br>
perf: Cải tiến hiệu năng</br>
test: Thêm test case còn thiếu, sửa unit test, ...</br>
build: Những thay đổi ảnh hưởng đến quá trình build</br>
ci: Thay đổi file cấu hình hoặc script CI</br>
<h3>description</h3>
Mô tả ngắn gọn về nội dung commit</br>
Không dài quá 50 ký tự để có thể dễ dàng đọc trên GitHub, cũng như các git tool khác</br>
Sử dụng câu mệnh lệnh, ở thì hiện tại. Ví dụ: “change ...“ thay vì “changed ...“</br>
Không viết hoa chữ cái đầu tiên</br>
Không sử dụng dấu chấm ở cuối câu</br>
[body]</br>
Là phần TÙY CHỌN, sử dụng để mô tả chi tiết hơn về commit nếu cần</br>
Cách phần <type>: <description> ở bên trên bởi 1 dòng trắng (blank line)
Nên dùng để giải thích câu hỏi What (để làm gì), hoặc Why (tại sao cần), chứ KHÔNG PHẢI How (làm như thế nào)
</sp>
<h2>Phân chia các nhánh & nhiệm vụ từng nhánh</h2>
<h3>Những nhánh mang tên thành viên là 1 chức năng(feature), mỗi thành viên đảm nhận phát triển tính năng của mình, khi code xong không gặp bug thì có thể push code lên repo(commit theo chuẩn ở trên)</h3>
<h3>Nhánh Master giữ nguyên, các thành viên chỉ code và commit nhánh của mình</h3>
<h3>khi các thành viên đều code xong tính năng của mình và muốn tổng hợp lại để test thì sẽ họp lại và merge các nhánh vào nhánh develop, nếu chạy ổn định không gặp vấn đề thì sẽ merge vào nhánh Master</h3>
