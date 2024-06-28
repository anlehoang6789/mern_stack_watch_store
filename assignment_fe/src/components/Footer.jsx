export default function Footer() {
  return (
    <div className="h-full py-10 bg-black">
      <div className="flex justify-center">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-0 sm:grid-cols-4 sm:gap-4">
            <div className="space-y-2 text-gray-600">
              <p>Mô tả âm thanh</p>
              <p>Quan hệ với nhà đầu tư</p>
              <p>Thông báo pháp lí</p>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Trung tâm trợ giúp</p>
              <p>Việc làm</p>
              <p>Tùy chọn cookie</p>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Thẻ quà tặng</p>
              <p>Điều khoản sử dụng</p>
              <p>Thông tin doanh nghiệp</p>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Trung tâm đa phương tiện</p>
              <p>Quyền riêng tư</p>
              <p>Liên hệ với chúng tôi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
