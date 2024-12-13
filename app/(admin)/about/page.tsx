import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminAboutPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">About</h1>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Background</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ultricies ridiculus congue risus platea consequat parturient est. Ut blandit amet consectetuer ut cras posuere molestie.
                Aliquam augue purus eget aliquam neque fusce ultricies. Proin mauris sed eleifend malesuada nisi orci leo. Urna ex pulvinar nisi suscipit, donec nestra. Maecenas lorem vitae
                lacus leo notus. Orci auctor potenti nulla, himenaeos dui ullamcorper. Est fames vestibulum, donec aliquam euismod dolor ut placerat.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Aquaculture</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ultricies ridiculus congue risus platea consequat parturient est. Ut blandit amet consectetuer ut cras posuere molestie.
                Aliquam augue purus eget aliquam neque fusce ultricies. Proin mauris sed eleifend malesuada nisi orci leo. Urna ex pulvinar nisi suscipit, donec nestra. Maecenas lorem vitae
                lacus leo notus. Orci auctor potenti nulla, himenaeos dui ullamcorper. Est fames vestibulum, donec aliquam euismod dolor ut placerat.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Appreciation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ultricies ridiculus congue risus platea consequat parturient est. Ut blandit amet consectetuer ut cras posuere molestie.
                Aliquam augue purus eget aliquam neque fusce ultricies. Proin mauris sed eleifend malesuada nisi orci leo. Urna ex pulvinar nisi suscipit, donec nestra. Maecenas lorem vitae
                lacus leo notus. Orci auctor potenti nulla, himenaeos dui ullamcorper. Est fames vestibulum, donec aliquam euismod dolor ut placerat.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}